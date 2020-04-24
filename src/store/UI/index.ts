/*
 * @文件描述:
 * @作者: Anton
 * @Date: 2020-04-17 12:01:06
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-24 14:42:03
 */
import { action, observable } from 'mobx';
import Routes from '@/../config/routes.config';

export class UIStore {
    @observable
    navTitle: string = Routes[0].routes[0].title; // 导航标题

    @observable
    ifLoading = false; // 是否展示loading

    @observable
    activeMenuKey: string = Routes[0].routes[0].key; // 当前展示页面的菜单索引

    @action
    toggleLoading = () => {
        this.ifLoading = !this.ifLoading;
    };

    @action
    setTitle = (title: string) => {
        this.navTitle = title;
    };

    @action
    setMenu = (key: string) => {
        this.activeMenuKey = key;
    };
}

const uiStore = new UIStore();
export default uiStore;
