/*
 * @文件描述:
 * @作者: Anton
 * @Date: 2020-04-16 15:05:26
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-20 18:44:43
 */
// typescript 只认识js ts的模块，其他格式的模块需要声明
declare module '*.css';
declare module '*.less';
declare module '*.png';

// 按需引入bizcharts 缺少typescript的type包 需要自行声明
declare module 'bizcharts/lib/components/TypedGeom/Line';

interface IAppConfig {
    APPID_QP: string; //壳牌华北小程序id
    APP_SERVICE: string; // 接口api
    WECHAT2_APP_URL: string;
    STATIC_URL: string; // oss地址
    HOME_STATIC: string; //本地服务器静态文件目录
    IMG_URL: string;
    IMG_BIG_URL: string;
    PINGAN_URL: string; //平安好车主的域名
    BPPC_URL: string; //中油BP的域名
}

// APP_CONFIG 定义在 config define 的环境变量中，需要声明typescript才能识别
declare let APP_CONFIG: IAppConfig;
