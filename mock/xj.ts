import { mock } from 'mockjs';

const resHandler = (data: any, time?: number) => (req, res) => {
    setTimeout(() => {
        res.send(data);
    }, time || 1000);
};

export default {
    // 支持值为 Object 和 Array
    'GET /api/users': { users: mock([]) },

    // GET 可忽略
    '/api/users/1': { id: 1 },

    'POST /api/users/create': (req, res) => {
        // 添加跨域请求头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end('ok');
    },

    'GET /weixin/xj/oilLowerPrice': resHandler(
        mock({
            status: 1,
            info: 'success',
            'data|50': [{ f_item_name: '@city', 'f_city_price|1-100': 50, 'f_store_price|0-2': 1 }]
        }),
        500
    )
};
