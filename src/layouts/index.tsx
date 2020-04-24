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

const { Content, Footer, Sider } = Layout;

@inject('uiStore')
@observer
class BasicLayout extends React.Component<IProps> {
    render() {
        const { uiStore } = this.props;
        const layoutContentDom = (
            <Content>
                {this.props.children}
                <Footer style={{ textAlign: 'center' }}>四项指标看板系统 ©2020 Created by 驿公里</Footer>
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
                    <MenuList activeMenuKey={this.props.uiStore.activeMenuKey} />
                </Sider>
                <Layout className="site-layout">
                    {Loading({ ifShow: uiStore.ifLoading, children: layoutContentDom })}
                </Layout>
            </Layout>
        );
    }
}

export default BasicLayout;
