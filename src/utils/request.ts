/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

export interface IResponse {
    status: string | number;
    info: string;
    data: any;
}

const TIME_OUT = 60000;

const CODE_MESSAGE: Record<string, string> = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};

/**
 * 异常处理
 * @param error umi-request 错误时返回的默认Response格式内容
 */
const errorHandler = (error: { response: Response }): IResponse => {
    const { response } = error;
    const errResult = {
        status: 233,
        info: '网络异常',
        data: null
    };
    console.log(error);
    if (response && response.status) {
        const errorText = CODE_MESSAGE[response.status] || response.statusText;
        const { status, url } = response;
        errResult.status = status;
        errResult.info = errorText;

        notification.error({
            message: `请求错误 ${status}: ${url}`,
            description: errorText
        });
    } else if (!response) {
        notification.error({
            description: '您的网络发生异常，无法连接服务器',
            message: '网络异常'
        });
    }
    return errResult;
};

/**
 * http状态为200的时候的统一处理函数
 * 还处理了登录失效的情况。
 * @param res
 * @param resolve
 * @param reject
 */
const successHandler = (res: IResponse): IResponse => {
    try {
        if (res.status === 1) {
            return res;
        } else {
            res.info = res.info || res.info || '未知错误';
            if (res.status == -999) {
                //session过期
                notification.error({
                    description: '您的登录状态已过期，请重新登录！',
                    message: '登录失效'
                });
            } else if (res.status == -9999) {
                //无权限
                notification.error({
                    description: '您没有权限查看！',
                    message: '无权限'
                });
            }
            return res;
        }
    } catch (e) {
        return errorHandler(e);
    }
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
    timeout: TIME_OUT,
    errorHandler, // 默认错误处理
    credentials: 'include' // 默认请求是否带上cookie
});

// 请求拦截器
request.interceptors.request.use((url, options) => {
    return {
        url: `${url}`,
        options: { ...options }
    };
});

export const get = async (url: string, data: object = {}): Promise<IResponse> => {
    const result = await request('/weixin/xj/oilLowerPrice', {
        method: 'GET',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    });
    if (result) {
        return successHandler(result);
    } else {
        return result;
    }
};

export const getText = async (url: string, data: object = {}): Promise<IResponse> => {
    const result = await request(url, {
        method: 'GET',
        params: data,
        responseType: 'text',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    });
    if (result) {
        return successHandler(result);
    } else {
        return result;
    }
};

export const post = async (url: string, data: object = {}): Promise<IResponse> => {
    const result = await request(url, {
        method: 'POST',
        data: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    if (result) {
        return successHandler(result);
    } else {
        return result;
    }
};

export const jsonPost = async (url: string, data: object = {}): Promise<IResponse> => {
    const result = await request(url, {
        method: 'POST',
        data: data,
        headers: { 'Content-Type': 'application/json' }
    });
    if (result) {
        return successHandler(result);
    } else {
        return result;
    }
};

export default request;
