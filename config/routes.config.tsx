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

const setMenuInfo = (key: string, icon: React.ReactNode, menuName: string) => ({ key, icon, menuName });

/** @ 代表src路径 . 代表pages路径 */
export default [
    {
        path: '/',
        component: '@/layouts',
        routes: [
            {
                title: '看板',
                path: '/',
                component: '@/pages/homepage',
                ...setMenuInfo('1', <UserOutlined />, '看板')
            },
            {
                title: '工单',
                path: '/course',
                component: '@/pages/homepage',
                ...setMenuInfo('2', <VideoCameraOutlined />, '工单')
            },
            {
                title: '出错了',
                path: '*',
                component: '@/pages/404'
            }
        ]
    }
];
