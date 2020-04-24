/*
 * @文件描述: 主页 统计看板
 * @作者: Anton
 * @Date: 2020-04-17 19:50:08
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-24 20:46:06
 */
import React from 'react';
import { history } from 'umi';
import { observer, inject } from 'mobx-react';
import { Label, Legend, Guide } from 'bizcharts';
import { UIStore } from '@/store/UI';
import { DashBoardStore, IPriceItem } from '@/store/Dashboard';
import CompoundChart, { IGeom, GEOM_TYPE } from '@/components/CompoundChart';
import PieChart from '@/components/PieChart';
import { Layout } from 'antd';
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';
import styles from './index.less';

interface IProps {
    uiStore: UIStore;
    dashboardStore: DashBoardStore;
}

interface IState {
    ifResize: boolean; // 使用了chart的页面请一定加上这个字段，用来监听窗口变化，charts作出高度响应
    priceList: Array<IPriceItem>;
}

const { Header, Content } = Layout;

@inject('uiStore', 'dashboardStore')
@observer
class Index extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            ifResize: false,
            priceList: []
        };
    }
    componentDidMount() {
        const _this = this;
        _this.initData();
        window.onresize = () => {
            _this.setState({
                ifResize: !_this.state.ifResize
            });
        };
    }
    componentWillUnmount() {
        window.onresize = null;
    }
    initData = async () => {
        const { uiStore, dashboardStore } = this.props;
        uiStore.toggleLoading();
        const result = await dashboardStore.getPriceList();
        this.setState({ priceList: result.data });
        uiStore.toggleLoading();
    };
    goToPage = (type: string) => () => {
        switch (type) {
            case 'order':
                history.push('/analysis');
                return;
        }
    };

    render() {
        const _this = this;
        const { ifResize } = this.state;
        const { dashboardStore, uiStore } = this.props;
        // geom内的children配置
        const geomChildren = (
            <React.Fragment>
                {/* guide配置 */}
                <Guide>
                    {/* 在折线末尾增加辅助点 */}
                    <Guide.DataMarker
                        top
                        display={{ point: true, line: false, text: false }}
                        style={{
                            point: {
                                fill: '#f3a536',
                                stroke: '#f3a536'
                            }
                        }}
                        position={(xScale, yScale) => {
                            // 只显示
                            const xVal = xScale['date'];
                            const yVal = yScale['price'];
                            if (!xVal || !yVal) return;
                            return [xVal.values.slice(-1)[0], yVal.values.slice(-1)[0]]; //位置信息
                        }}
                    />
                </Guide>
            </React.Fragment>
        );
        // 配置折线的config
        const getLineConfig = (typeKey: string, typeName: string) => ({
            type: GEOM_TYPE.LINE,
            configList: [
                {
                    typeKey,
                    typeName,
                    color: '#f3a536'
                }
            ]
        });
        // 配置面积图的config
        const getAreaConfig = (typeKey: string, typeName: string) => ({
            type: GEOM_TYPE.AREA,
            configList: [
                {
                    typeKey,
                    typeName,
                    color: 'l(90) 0:#FFDB9F 1:rgba(255,247,220,0.3)'
                }
            ]
        });
        // 遍历生成 运营数据 图表
        const operationChartList = [
            {
                title: '今日单量',
                value: '21003',
                leftFooter: `当月单量：${'221223.00'}`,
                xKeyName: 'date',
                yKeyName: 'price',
                data: dashboardStore.priceList,
                geomList: [getLineConfig('income', '营收')],
                onClick: _this.goToPage('order')
            },
            {
                title: '今日营业额',
                value: '10003.00',
                leftFooter: `当月营业额：${'221223.00'}`,
                rightFooter: `当月客单：${'11.02'}`,
                xKeyName: 'date',
                yKeyName: 'price',
                data: dashboardStore.priceList,
                geomList: [getLineConfig('income', '营收')],
                onClick: _this.goToPage('order')
            },
            {
                title: '今日毛利',
                value: '8903.00',
                leftFooter: `当月毛利：${'221223.12'}`,
                rightFooter: `当月完成率：${'71.32'}%`,
                xKeyName: 'date',
                yKeyName: 'price',
                data: dashboardStore.priceList,
                geomList: [getLineConfig('income', '营收')],
                onClick: _this.goToPage('order')
            }
        ];
        // 遍历生成 反馈数据 图表
        const feedbackChartList = [
            {
                title: '近30日好评率(%)',
                value: '87.10',
                status: 1,
                xKeyName: 'date',
                yKeyName: 'price',
                data: dashboardStore.priceList,
                geomList: [getLineConfig('income', '营收'), getAreaConfig('income', '营收')],
                onClick: _this.goToPage('order')
            },
            {
                title: '近30日分享率(%)',
                value: '3.41',
                status: 1,
                leftFooter: `当月营业额：${'221223.00'}`,
                rightFooter: `当月客单：${'11.02'}`,
                xKeyName: 'date',
                yKeyName: 'price',
                data: dashboardStore.priceList,
                geomList: [getLineConfig('income', '营收'), getAreaConfig('income', '营收')],
                onClick: _this.goToPage('order')
            },
            {
                title: '近30日复购率(%)',
                value: '29.55',
                status: -1,
                leftFooter: `当月毛利：${'221223.00'}`,
                rightFooter: `当月完成率：${'11.02%'}`,
                xKeyName: 'date',
                yKeyName: 'price',
                data: dashboardStore.priceList,
                geomList: [getLineConfig('income', '营收'), getAreaConfig('income', '营收')],
                onClick: _this.goToPage('order')
            }
        ];
        return (
            <div id="page-homepage">
                <Header className={styles.navHeader}>
                    <div className={styles.headerTitle}>{uiStore.navTitle}</div>
                    <div className={styles.headerRight}>地图</div>
                </Header>
                <Content id="page-homepage" className={styles.container}>
                    <div className={styles.leftContainer}>
                        {/* 今日运营数据 */}
                        <div className={styles.operationCard}>
                            {operationChartList.map((item, index) => (
                                <div key={index} className={styles.chartCard} onClick={item.onClick}>
                                    <div className={styles.chartHeader}>
                                        <div className={styles.chartHeaderTitle}>{item.title}</div>
                                        <div className={styles.chartHeaderVal}>{item.value}</div>
                                    </div>
                                    <div id="page-homepage-operationChart" style={{ flex: 1 }}>
                                        <CompoundChart
                                            parentDom={document.getElementById('page-homepage-operationChart') || null}
                                            showToolTip
                                            geomChildren={geomChildren}
                                            xKeyName={item.xKeyName}
                                            yKeyName={item.yKeyName}
                                            data={item.data}
                                            geomList={item.geomList}
                                        />
                                    </div>
                                    <div className={styles.chartFooter}>
                                        {item.leftFooter && <div>{item.leftFooter}</div>}
                                        {item.rightFooter && <div>{item.rightFooter}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* 今日反馈数据 */}
                        <div className={styles.feedbackCard}>
                            {feedbackChartList.map((item, index) => (
                                <div key={index} className={styles.chartCard}>
                                    <div className={styles.chartHeader}>
                                        <div className={styles.headerTip}>
                                            <div className={styles.chartHeaderVal}>
                                                {item.value}
                                                {item.status === 1 ? (
                                                    <CaretUpFilled className={styles.caretUp} />
                                                ) : (
                                                    <CaretDownFilled className={styles.caretDown} />
                                                )}
                                            </div>
                                            <div className={styles.chartHeaderTitle}>{item.title}</div>
                                        </div>
                                    </div>
                                    <div id="page-homepage-feedbackChart" style={{ flex: 1 }}>
                                        <CompoundChart
                                            parentDom={document.getElementById('page-homepage-feedbackChart') || null}
                                            geomChildren={geomChildren}
                                            xKeyName={item.xKeyName}
                                            yKeyName={item.yKeyName}
                                            data={item.data}
                                            geomList={item.geomList}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.rightContainer}>
                        {/* 站点统计 */}
                        <div className={styles.factoryCard}>
                            <div className={styles.header}>
                                <div className={styles.headerItem}>
                                    <div className={styles.headerTitle}>站点数量</div>
                                    <div className={styles.headerVal}>{1003}</div>
                                </div>
                                <div className={styles.headerItem}>
                                    <div className={styles.headerTitle}>维护中</div>
                                    <div className={styles.headerVal}>{34}</div>
                                </div>
                                <div className={styles.headerItem}>
                                    <div className={styles.headerTitle}>运营率(%)</div>
                                    <div className={styles.headerVal}>{'87.10'}</div>
                                </div>
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.footerItem}>
                                    <div className={styles.footerTitle}>故障抢修</div>
                                    <div className={styles.footerVal}>{14}</div>
                                </div>
                                <div className={styles.footerItem}>
                                    <div className={styles.footerTitle}>油站原因</div>
                                    <div className={styles.footerVal}>{19}</div>
                                </div>
                                <div className={styles.footerItem}>
                                    <div className={styles.footerTitle}>设备升级</div>
                                    <div className={styles.footerVal}>{0}</div>
                                </div>
                                <div className={styles.footerItem}>
                                    <div className={styles.footerTitle}>天气原因</div>
                                    <div className={styles.footerVal}>{1}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </div>
        );
    }
}

export default Index;
