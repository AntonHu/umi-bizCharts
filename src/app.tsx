/*
 * @文件描述: 运行时配置 也可认为是入口文件
 * @作者: Anton
 * @Date: 2020-04-21 19:55:42
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-23 18:12:01
 */
import { history } from 'umi';
import React from 'react';
import Routes, { IRouteItem } from '../config/routes.config';
import { Provider } from 'mobx-react';
import store from '@/store';
import uiStore from './store/UI';

/**
 * 改写整个应用render到dom树里。
 * 可能场景：
 *  1. 在渲染应用之前做权限校验，不通过则跳转到登录页（单点登录场景会很有用）
 *  2. 和pathRoutes配合，在render时请求后端接口，拿到动态路由
 * @param oldRender
 */
export async function render(oldRender: Function) {
    const isLogin = true;
    if (isLogin) {
        oldRender();
    } else {
        history.push('/');
    }
}

/**
 * 修改交给 react-dom 渲染时的根组件。
 * 比如用于在外面包一个 Provider，
 * @param container
 */
export function rootContainer(container: React.ReactNode) {
    // 包装 mobx 的 Provider
    const providerDom = <Provider {...store}>{container}</Provider>;
    return providerDom;
}
/**
 * 路由变化处理
 * @param {*} { location, routes, action }
 */
export function onRouteChange({ location }: { location: Record<string, string> }) {
    // 设置菜单选中项和header标题
    if (location.pathname === '/') {
        // 如果是根路由，直接设置菜单选中1
        uiStore.setMenu('1');
        uiStore.setTitle('看板');
        return;
    }
    const result: Array<IRouteItem> = Routes[0].routes.filter(item => {
        // 查找path匹配的路由配置，且排除根路由
        return item.path !== '/' && location.pathname?.indexOf(item.path) !== -1;
    });
    if (result.length === 0) {
        // 无效路由设置
        uiStore.setMenu('0');
        uiStore.setTitle('出错了');
    } else {
        // 有效路由设置
        uiStore.setMenu(result[0].key || '1');
        uiStore.setTitle(result[0].title || '');
    }
}
