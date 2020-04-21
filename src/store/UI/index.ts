/*
 * @文件描述:
 * @作者: Anton
 * @Date: 2020-04-17 12:01:06
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-20 17:49:34
 */
import { action, observable } from 'mobx';

export class UIStore {
    @observable
    navTitle = '统计看板'; // 导航标题

    @observable
    ifLoading = false; // 是否展示loading

    @observable
    activeMenuKey = '0'; // 当前展示页面的菜单索引

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
