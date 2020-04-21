import React from 'react';
import { inject, observer } from 'mobx-react';
import Loading from '@/components/Loading';
import MenuList from './components/MenuList';
import { UIStore } from '@/store/UI';
import { Layout } from 'antd';
import styles from './index.less';

interface IProps {
    uiStore: UIStore;
}

const { Header, Content, Footer, Sider } = Layout;

@inject('uiStore')
@observer
class BasicLayout extends React.Component<IProps> {
    state = {};

    render() {
        const { uiStore } = this.props;
        const layoutContentDom = (
            <Content>
                <Header className={styles.siteLayoutBackground} style={{ padding: 0 }}>
                    <div className={styles.headerTitle}>{this.props.uiStore.navTitle}</div>
                </Header>
                <Content className={styles.container}>
                    {this.props.children}
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

                    <MenuList uiStore={this.props.uiStore} />
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    {Loading({ ifShow: uiStore.ifLoading, children: layoutContentDom })}
                </Layout>
            </Layout>
        );
    }
}

export default BasicLayout;
