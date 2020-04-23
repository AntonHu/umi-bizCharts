/*
 * @文件描述: 看板数据 store
 * @作者: Anton
 * @Date: 2020-04-22 09:23:13
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-22 09:44:43
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

export class DashBoardStore {
    @observable
    priceList: Array<IPriceItem> = []; // 营收列表

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
}

const dashboardStore = new DashBoardStore();
export default dashboardStore;
