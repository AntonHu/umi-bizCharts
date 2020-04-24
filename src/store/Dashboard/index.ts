/*
 * @文件描述: 看板数据 store
 * @作者: Anton
 * @Date: 2020-04-22 09:23:13
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-24 18:19:08
 */
import { action, observable, runInAction } from 'mobx';
import { IResponse, get } from '@/utils/request';

const serverUrl = APP_CONFIG.APP_SERVICE;

export interface IPriceItem {
    date: string; // 日期
    income: number; // 收入
    cost: number; // 成本
    profit: number; // 毛利
}

export interface IOrderItem {
    income: number; //营收
    successRate: number | string; //交易成功率
    num: number; //总单量
    incomeSharing: number; //驿公里收益
    factoryNum: number; //站点数量
    day: string; //单天时间
}

export class DashBoardStore {
    @observable
    priceList: Array<IPriceItem> = []; // 营收列表

    @observable
    orderList: Array<IOrderItem> = []; // 客单列表

    /**
     * 获取看板 营收列表
     */
    @action
    getPriceList = async (): Promise<IResponse> => {
        try {
            const response = await get(`${serverUrl}weixin/dashboard/getPriceList`);
            response &&
                response.data &&
                runInAction(() => {
                    this.priceList = response.data;
                });
            return response;
        } catch (e) {
            return e;
        }
    };

    /**
     * 获取客单列表
     * @param {*}
     * @param {string} factoryIds 站点id（为空则为全部站点）
     * @param {string} factoryClass 站点类型，固定值（A）
     * @param {string} serviceId 服务id，固定值(2002)
     * @param {string} statusLs 订单状态（50,60）
     * @param {string} startDate 开始时间（2020-04-23）
     * @param {string} endDate 结束时间（2020-03-23）
     */
    @action
    getOrderList = async ({
        factoryIds,
        factoryClass = 'A',
        serviceId = '2002',
        statusLs,
        startDate,
        endDate
    }: Record<string, any>): Promise<IResponse> => {
        try {
            const dingUserId = '';
            const response = await get(`${serverUrl}washData/findOrdersD2D`, {
                factoryIds,
                factoryClass,
                serviceId,
                statusLs,
                startDate,
                endDate,
                dingUserId
            });
            response &&
                response.data &&
                runInAction(() => {
                    this.orderList = response.data;
                });
            return response;
        } catch (e) {
            return e;
        }
    };
}

const dashboardStore = new DashBoardStore();
export default dashboardStore;
