/*
 * @文件描述: 菜单组件
 * @作者: Anton
 * @Date: 2020-04-17 19:29:13
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-24 16:07:38
 */
import React from 'react';
import { Link } from 'umi';
import Routes, { IRouteItem } from '../../../config/routes.config';
import { Menu } from 'antd';
import styles from './MenuList.less';

interface IProps {
    activeMenuKey: string;
}

interface IState {
    menuList: Array<IRouteItem>;
}

class MenuItem extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            menuList: []
        };
    }

    componentDidMount() {
        const { routes } = Routes[0];
        // 筛选路由，有 menuName 属性的路由才是菜单项
        this.setState({ menuList: routes.filter((item: IRouteItem) => item.menuName) });
    }

    render() {
        const { activeMenuKey } = this.props;
        return (
            <Menu theme="dark" mode="inline" selectedKeys={[activeMenuKey]}>
                {this.state.menuList.map(item => (
                    <Menu.Item key={item.key}>
                        <Link to={item.path}>
                            {item.icon}
                            <span className={styles.menuName}>{item.menuName}</span>
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>
        );
    }
}

export default MenuItem;
