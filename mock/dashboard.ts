/*
 * @文件描述: 看板数据 mock
 * @作者: Anton
 * @Date: 2020-04-22 09:25:27
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-24 20:47:34
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
    })(),

    'GET /washData/findOrdersD2D': (() => {
        const res = [];
        for (let i = 1; i < 31; i++) {
            res.push({
                'income|200000-350000.2': 323753.42, //营收
                'successRate|80-105.2': 103.74, //交易成功率
                'num|35000-45000': 40161, //总单量
                'incomeSharing|200000-300000.4': 252029.72, //驿公里收益
                'factoryNum|900-1200': 1027, //站点数量
                day: '2020-04-' + (i < 10 ? '0' + i : i) //单天时间
            });
        }
        return resHandler(
            mock({
                status: 1,
                info: 'success',
                data: res
            }),
            0
        );
    })()
};
