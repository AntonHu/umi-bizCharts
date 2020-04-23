/*
 * @文件描述: 看板数据 mock
 * @作者: Anton
 * @Date: 2020-04-22 09:25:27
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-23 14:12:28
 */
import { resHandler } from './index';
import { mock } from 'mockjs';

export default {
    // 获取看板的经营数据
    'GET /weixin/dashboard/getPriceList': (() => {
        const res = [];
        for (let i = 1; i < 5; i++) {
            res.push({
                date: '04-' + (i < 10 ? '0' + i : i),
                'income|100-200': 100,
                'cost|50-100': 50,
                'profit|50-100': 50
            });
        }
        return resHandler(
            mock({
                status: 1,
                info: 'success',
                data: res
            }),
            500
        );
    })()
};
