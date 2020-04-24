/*
 * @Author: Anton
 * @Date: 2020-04-20 15:14:15
 * @Last Modified by: Anton
 * @Last Modified time: 2020-04-20 15:15:28
 * 路由文件，包含导航菜单的配置
 */
import React from 'react';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';

export interface IRouteItem {
    title?: string;
    path: string;
    component: string;
    key?: string;
    icon?: React.ReactNode;
    menuName?: string;
}

/**
 * 设置菜单子项信息
 * @param {string} key 菜单项的唯一key
 * @param {React.ReactNode} icon 菜单项的图标，暂时使用antd提供的图标组件
 * @param {string} menuName 菜单项名称
 */
const setMenuInfo = (key: string, icon: React.ReactNode, menuName: string) => ({ key, icon, menuName });

/** @ 代表src路径 . 代表pages路径 */
export default [
    {
        path: '/',
        component: '@/layouts',
        routes: [
            {
                exact: true,
                title: '统计看板', // 路由名称，默认作为header组件和网页title的标题
                path: '/',
                component: '@/pages/homepage',
                // 只有设置了menuName才是菜单项，否则就只是路由，例如404页面就不需要
                ...setMenuInfo('1', <UserOutlined />, '我的')
            },
            {
                title: '订单分析',
                path: '/analysis',
                component: '@/pages/analysis',
                ...setMenuInfo('2', <VideoCameraOutlined />, '工单')
            },
            {
                title: '未找到页面',
                path: '*',
                component: '@/pages/404'
            }
        ]
    }
];
