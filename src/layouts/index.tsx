import React from 'react';
import { inject, observer } from 'mobx-react';
import Loading from '@/components/Loading';
import MenuList from './components/MenuList';
import { UIStore } from '@/store/UI';
import { Layout, Menu } from 'antd';
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
import styles from './index.less';

interface IProps {
    uiStore: UIStore;
}

const { Header, Content, Footer, Sider } = Layout;

@inject('uiStore')
@observer
class BasicLayout extends React.Component<IProps> {
    state = {
        menuList: [
            {
                key: '1',
                icon: <UserOutlined />,
                menuName: '我的'
            },
            {
                key: '2',
                icon: <VideoCameraOutlined />,
                menuName: '历程'
            },
            {
                key: '3',
                icon: <UploadOutlined />,
                menuName: '工单'
            },
            {
                key: '4',
                icon: <BarChartOutlined />,
                menuName: '事件'
            },
            {
                key: '5',
                icon: <CloudOutlined />,
                menuName: '咨询'
            },
            {
                key: '6',
                icon: <AppstoreOutlined />,
                menuName: '对账'
            },
            {
                key: '7',
                icon: <TeamOutlined />,
                menuName: '审批'
            },
            {
                key: '8',
                icon: <ShopOutlined />,
                menuName: '绩效'
            }
        ]
    };

    render() {
        const { uiStore } = this.props;
        const layoutContentDom = (
            <Content>
                <Header className={styles.siteLayoutBackground} style={{ padding: 0 }}>
                    <div className={styles.headerTitle}>{this.props.uiStore.navTitle}</div>
                </Header>
                <Content
                    style={{
                        padding: '24px 16px 0',
                        overflow: 'auto',
                        height: 'calc(100vh - 64px)'
                    }}
                >
                    <div className={styles.siteLayoutBackground} style={{ padding: 24, textAlign: 'center' }}>
                        {this.props.children}
                    </div>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Content>
            </Content>
        );
        return (
            <Layout>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0
                    }}
                >
                    <div className={styles.logo} />

                    <MenuList menuList={this.state.menuList} />
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    {Loading({ ifShow: uiStore.ifLoading, children: layoutContentDom })}
                </Layout>
            </Layout>
        );
    }
}

export default BasicLayout;
