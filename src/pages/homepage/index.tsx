/*
 * @文件描述: 主页
 * @作者: Anton
 * @Date: 2020-04-17 19:50:08
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-23 18:21:25
 */
import React from 'react';
import { history } from 'umi';
import { observer, inject } from 'mobx-react';
import { Label, Legend, Guide, Tooltip } from 'bizcharts';
import { UIStore } from '@/store/UI';
import { DashBoardStore, IPriceItem } from '@/store/Dashboard';
import CompoundChart, { IGeom, GEOM_TYPE } from '@/components/CompoundChart';
import PieChart from '@/components/PieChart';
import styles from './index.less';

interface IProps {
    uiStore: UIStore;
    dashboardStore: DashBoardStore;
}

interface IState {
    ifResize: boolean;
    priceList: Array<IPriceItem>;
}

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
    goToPage = () => {
        history.push('/goto');
    };

    render() {
        const { ifResize } = this.state;
        const { dashboardStore } = this.props;
        const configList = [
            {
                typeKey: 'income',
                typeName: '营收',
                color: '#f3a536'
            }
        ];
        const geomList: Array<IGeom> = [
            {
                type: GEOM_TYPE.LINE,
                configList
            }
        ];
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
        // guide配置
        const guideContainer = (
            <Guide>
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
        );
        return (
            <div id="page-homepage" className={styles.container}>
                {/* 今日运营数据 */}
                <div className={styles.operationCard}>
                    <div className={styles.leftContainer}>
                        <div className={styles.chartCard}>
                            <div className={styles.chartHeader}>
                                <div className={styles.chartHeaderTitle}>今日单量</div>
                                <div className={styles.chartHeaderVal}>{'21003.00'}</div>
                            </div>
                            <CompoundChart
                                ifResize={ifResize}
                                data={dashboardStore.priceList}
                                xKeyName={'date'}
                                yKeyName={'price'}
                                geomList={geomList}
                                geomChildren={<React.Fragment>{guideContainer}</React.Fragment>}
                            />
                            <div className={styles.chartFooter}>
                                <div>当月单量：{'221223.00'}</div>
                            </div>
                        </div>
                        <div className={styles.chartCard}>
                            <div className={styles.chartHeader}>
                                <div className={styles.chartHeaderTitle}>今日营业额</div>
                                <div className={styles.chartHeaderVal}>{'21003.00'}</div>
                            </div>
                            <CompoundChart
                                ifResize={ifResize}
                                data={dashboardStore.priceList}
                                xKeyName={'date'}
                                yKeyName={'price'}
                                geomList={geomList}
                                geomChildren={
                                    <React.Fragment>
                                        <Label content="price" />
                                    </React.Fragment>
                                }
                            />
                            <div className={styles.chartFooter}>
                                <div>当月营业额：{'221223.00'}</div>
                                <div>当月客单：{'11.02'}</div>
                            </div>
                        </div>
                        <div className={styles.chartCard}>
                            <div className={styles.chartHeader}>
                                <div className={styles.chartHeaderTitle}>今日毛利</div>
                                <div className={styles.chartHeaderVal}>{'21003.00'}</div>
                            </div>
                            <CompoundChart
                                ifResize={ifResize}
                                data={dashboardStore.priceList}
                                xKeyName={'date'}
                                yKeyName={'price'}
                                geomList={geomList}
                            />
                            <div className={styles.chartFooter}>
                                <div>当月毛利：{'221223.00'}</div>
                                <div>当月完成率：{11.02 + '%'}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.rightContainer}>
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
            </div>
        );
    }
}

export default Index;
