import { resHandler } from './index';
import { mock } from 'mockjs';

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
