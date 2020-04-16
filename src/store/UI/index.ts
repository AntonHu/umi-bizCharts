import { action, observable } from 'mobx';

/** 菜单对象 */
export interface IMenuItem {
    name: string // 菜单名称
    index: number // 菜单index
}

export class UIStore {
    @observable
    navTitle: string = '主页'; // 导航标题

    @observable
    ifLoading: boolean = false; // 是否展示loading

    @observable
    activeMenu: IMenuItem = {
        name: '主页', index: 0
    }; // 当前展示页面的菜单对象

    @action
    toggleLoading() {
        this.ifLoading = !this.ifLoading;
    }

    @action
    setTitle(title: string) {
        this.navTitle = title;
    }

    @action
    setMenu(menuItem: IMenuItem) {
        this.activeMenu = menuItem;
    }
}

const uiStore = new UIStore();
export default uiStore;
