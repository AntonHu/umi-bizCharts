import { mock } from 'mockjs';

/**
 * 响应处理
 * @param data mock数据
 * @param time 响应延时ms
 */
const resHandler = (data: any, time?: number) => (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    setTimeout(() => {
        res.send(data);
    }, time || 1000);
};

export default {
    // 支持值为 Object 和 Array
    'GET /api/users': resHandler({ users: mock([]) }),

    // GET 可忽略
    '/api/users/1': resHandler({ id: 1 }),

    'POST /api/users/create': resHandler('ok'),

    'GET /weixin/xj/oilLowerPrice': resHandler(
        mock({
            status: 1,
            info: 'success',
            'data|5': [{ f_item_name: '@city', 'f_city_price|1-100': 50, 'f_store_price|0-2': 1 }]
        }),
        500
    )
};
