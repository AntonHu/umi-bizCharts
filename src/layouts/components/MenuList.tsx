import React from 'react';
import { Menu } from 'antd';
import styles from './MenuList.less';

interface IMenuItem {
    key: number | string;
    icon: React.ReactNode;
    menuName: string;
}

interface IProps {
    menuList: Array<IMenuItem>;
}

class MenuItem extends React.Component<IProps> {
    render() {
        const { menuList } = this.props;
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                {menuList.map(item => (
                    <Menu.Item key={item.key}>
                        {item.icon}
                        <span className={styles.menuName}>{item.menuName}</span>
                    </Menu.Item>
                ))}
            </Menu>
        );
    }
}

export default MenuItem;
