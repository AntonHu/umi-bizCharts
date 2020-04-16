import React from 'react';
import { inject, observer } from 'mobx-react';
import Loading from '@/components/Loading';
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
  VideoCameraOutlined,
} from '@ant-design/icons';
import styles from './index.less';

interface IProps {
  uiStore: UIStore;
}

const { Header, Content, Footer, Sider } = Layout;

@inject('uiStore')
@observer
class BasicLayout extends React.Component<IProps> {
  render() {
    const { uiStore } = this.props;
    const layoutDom = (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className={styles.logo} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <UserOutlined />
              <span className="nav-text">nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <VideoCameraOutlined />
              <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <UploadOutlined />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
            <Menu.Item key="4">
              <BarChartOutlined />
              <span className="nav-text">nav 4</span>
            </Menu.Item>
            <Menu.Item key="5">
              <CloudOutlined />
              <span className="nav-text">nav 5</span>
            </Menu.Item>
            <Menu.Item key="6">
              <AppstoreOutlined />
              <span className="nav-text">nav 6</span>
            </Menu.Item>
            <Menu.Item key="7">
              <TeamOutlined />
              <span className="nav-text">nav 7</span>
            </Menu.Item>
            <Menu.Item key="8">
              <ShopOutlined />
              <span className="nav-text">nav 8</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className={styles.siteLayoutBackground} style={{ padding: 0 }}>
            <div className={styles.headerTitle}>{this.props.uiStore.navTitle}</div>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div
              className={styles.siteLayoutBackground}
              style={{ padding: 24, textAlign: 'center' }}
            >
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
    return Loading({ ifShow: uiStore.ifLoading, children: layoutDom });
  }
}

export default BasicLayout;
