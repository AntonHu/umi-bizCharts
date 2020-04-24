/*
 * @文件描述: 订单分析页面
 * @作者: Anton
 * @Date: 2020-04-24 14:19:06
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-24 21:00:30
 */
import React from 'react';
import { history } from 'umi';
import { observer, inject } from 'mobx-react';
import { Label, Legend, Guide, Axis } from 'bizcharts';
import { UIStore } from '@/store/UI';
import { DashBoardStore, IPriceItem } from '@/store/Dashboard';
import CompoundChart, { IGeom, GEOM_TYPE } from '@/components/CompoundChart';
import PieChart from '@/components/PieChart';
import { LeftOutlined } from '@ant-design/icons';
import { Layout, Radio } from 'antd';
import styles from './index.less';

interface IProps {
    uiStore: UIStore;
    dashboardStore: DashBoardStore;
}

interface IState {
    ifResize: boolean;
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
        const result = await dashboardStore.getOrderList({});
        this.setState({ priceList: result.data });
        uiStore.toggleLoading();
    };

    render() {
        const _this = this;
        const { ifResize } = this.state;
        const { dashboardStore } = this.props;
        // const legendComponent = (
        //     <Legend
        //         position="left-top"
        //         layout="horizontal"
        //         useHtml
        //         containerTpl={`
        //             <div class="g2-legend diy-g2-legend" style="position:absolute;top:20px;right:60px;">
        //                 <h4 class="g2-legend-title"></h4>
        //                 <ul class="g2-legend-list" style="display: flex;list-style-type:none;margin:0;padding:0;"></ul>
        //             </div>
        //         `}
        //         itemTpl={val => {
        //             return `
        //                 <li
        //                     class="g2-legend-list-item item-{index} {checked} diy-legend-li"
        //                     data-color="{originColor}" data-value="{originValue}"
        //                 >
        //                     <div>
        //                         <i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>
        //                     </div>
        //                     <div style="display: flex;flex-direction: column;align-items: flex-start;word-break: keep-all">
        //                         <div class="g2-legend-text">{value}</div>
        //                         ${
        //                             val === '毛利'
        //                                 ? `<div class="g2-legend-text" style="font-size: 10px;text-align: left">完成率131313</div>`
        //                                 : ''
        //                         }
        //                     </div>
        //                 </li>
        //             `;
        //         }}
        //     />
        // );

        const radioList = [
            {
                title: '单量',
                value: 1
            },
            {
                title: '营收',
                value: 2
            },
            {
                title: '好评率',
                value: 3
            },
            {
                title: '复购率',
                value: 4
            }
        ];
        const orderGeomChildren = (
            <React.Fragment>
                <Axis name="num" />
            </React.Fragment>
        );
        return (
            <div id="page-analysis">
                <Header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className={styles.backBtn}>
                            <LeftOutlined className={styles.backBtnIcon} />
                        </div>
                        <div>全部站点</div>
                    </div>
                    <div className={styles.headerMiddle}>
                        <Radio.Group defaultValue={1} buttonStyle="solid">
                            {radioList.map(item => (
                                <Radio.Button key={item.value} value={item.value}>
                                    {item.title}
                                </Radio.Button>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className={styles.headerRight}></div>
                </Header>
                <Content className={styles.container}>
                    <div className={styles.main}>
                        <div className={styles.mainHeader}>
                            <div className={styles.headerLeft}>1031837</div>
                            <div className={styles.headerRight}>导出</div>
                        </div>
                        <div className={styles.mainContainer}>
                            <div id="page-analysis-mainChart" className={styles.chartCard}>
                                <CompoundChart
                                    padding={['auto', '2%', 'auto', 'auto']}
                                    showToolTip
                                    setToolTip={(title, items) => {
                                        return (
                                            <div>
                                                自定义tooltip <br />
                                                title: {title}
                                                {items.map((it, idx) => (
                                                    <div key={idx}>
                                                        color: {it.color}
                                                        <br />
                                                        数据: {it.point._origin.value}
                                                        <br />
                                                        <div type="primary">详细信息</div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    }}
                                    parentDom={document.getElementById('page-analysis-mainChart')}
                                    geomChildren={orderGeomChildren}
                                    xKeyName={'day'}
                                    yKeyName={'num'}
                                    data={dashboardStore.orderList}
                                    geomList={[
                                        {
                                            type: GEOM_TYPE.INTERVAL,
                                            configList: [
                                                {
                                                    typeKey: 'num',
                                                    typeName: '客单量',
                                                    color: '#FDD903'
                                                }
                                            ]
                                        },
                                        {
                                            type: GEOM_TYPE.LINE,
                                            configList: [
                                                {
                                                    typeKey: 'num',
                                                    typeName: '运营率',
                                                    color: '#6ABD08'
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </Content>
            </div>
        );
    }
}

export default Index;
