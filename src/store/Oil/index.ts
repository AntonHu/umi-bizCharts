import { action, observable, runInAction } from 'mobx';
import { IResponse, get } from '@/utils/request';

// 油价对象
export interface IOilPriceItem {
    f_city_price: number; // 汽油市价
    f_item_name: string; // 汽油名称
    f_store_price: number; // 汽油油站价
}

const serverUrl = APP_CONFIG.APP_SERVICE;

export class OilStore {
    @observable
    priceList: Array<IOilPriceItem> = []; // 油价列表

    /**
     * 获取汽油最低价
     */
    @action
    getOilPrice = async (): Promise<IResponse> => {
        try {
            const response = await get(`${serverUrl}weixin/xj/oilLowerPrice`);
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

const oilStore = new OilStore();
export default oilStore;
