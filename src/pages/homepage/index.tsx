/*
 * @文件描述: 主页
 * @作者: Anton
 * @Date: 2020-04-17 19:50:08
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-21 19:54:53
 */
import React from 'react';
import { history } from 'umi';
import { observer, inject } from 'mobx-react';
import { Label, Legend } from 'bizcharts';
import { UIStore } from '@/store/UI';
import { OilStore } from '@/store/Oil';
import CompoundChart, { IGeom, GEOM_TYPE } from '@/components/CompoundChart';
import styles from './index.less';

interface IProps {
    uiStore: UIStore;
    oilStore: OilStore;
}

@inject('uiStore', 'oilStore')
@observer
class Index extends React.Component<IProps> {
    componentDidMount() {
        // this.initData();
    }
    initData = async () => {
        const { uiStore, oilStore } = this.props;
        uiStore.toggleLoading();
        const result = await oilStore.getOilPrice();
        console.log(result);
        uiStore.toggleLoading();
    };
    goToPage = () => {
        history.push('/goto');
    };

    render() {
        const { oilStore } = this.props;
        const data = [
            {
                date: '04-01',
                income: 100,
                cost: 80,
                profit: 20
            },
            {
                date: '04-02',
                income: 110,
                cost: 82,
                profit: 28
            },
            {
                date: '04-03',
                income: 130,
                cost: 85,
                profit: 45
            }
        ];
        const geomList: Array<IGeom> = [
            {
                type: GEOM_TYPE.INTERVAL,
                configList: [
                    {
                        typeKey: 'income',
                        typeName: '营收',
                        color: '#ff7f0e'
                    },
                    {
                        typeKey: 'cost',
                        typeName: '成本',
                        color: '#2ca02c'
                    },
                    {
                        typeKey: 'profit',
                        typeName: '毛利',
                        color: 'rgba(0, 146, 255, 1)'
                    }
                ]
            }
            // {
            //     type: GEOM_TYPE.POINT,
            //     configList: [
            //         {
            //             typeKey: 'income',
            //             typeName: '营收',
            //             color: '#ff7f0e'
            //         },
            //         {
            //             typeKey: 'cost',
            //             typeName: '成本',
            //             color: '#2ca02c'
            //         },
            //         {
            //             typeKey: 'profit',
            //             typeName: '毛利',
            //             color: 'rgba(0, 146, 255, 1)'
            //         }
            //     ]
            // }
        ];
        const chartHeight = 100; // 图表的高度设定
        return (
            <div id="page-homepage" className={styles.container}>
                <div className={styles.todayCard}>
                    <div className={styles.leftContainer}>
                        <div className={styles.chartCard}>
                            <div className={styles.chartHeader}>
                                <div>今日单量</div>
                                <div>21003</div>
                            </div>
                            <CompoundChart
                                height={chartHeight}
                                data={data}
                                xKeyName={'date'}
                                yKeyName={'price'}
                                geomList={geomList}
                            />
                            <div className={styles.chartFooter}>
                                <div>
                                    <span>当月营业额：</span>
                                    <span>221223.00</span>
                                </div>
                                <div>
                                    <span>当月客单：</span>
                                    <span>11.02</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.chartCard}>
                            <div className={styles.chartHeader}>
                                <div>今日单量</div>
                                <div>21003</div>
                            </div>
                            <CompoundChart
                                height={chartHeight}
                                data={data}
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
                                <div>当月营业额：221223.00</div>
                                <div>当月客单：11.02</div>
                            </div>
                        </div>
                        <div className={styles.chartCard}>
                            <div className={styles.chartHeader}>
                                <div>今日单量</div>
                                <div>21003</div>
                            </div>
                            <CompoundChart
                                height={chartHeight}
                                data={data}
                                xKeyName={'date'}
                                yKeyName={'price'}
                                geomList={geomList}
                                chartChildren={
                                    <React.Fragment>
                                        <Legend
                                            position="left-top"
                                            layout={'horizontal'}
                                            useHtml
                                            itemTpl={`
                                                <li 
                                                    class="g2-legend-list-item item-{index} {checked}" 
                                                    data-color="{originColor}" data-value="{originValue}" 
                                                    style="display:flex;cursor: pointer;font-size: 14px;"
                                                >
                                                    <div style="">
                                                        <i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>
                                                    </div>
                                                    <div>
                                                        <div class="g2-legend-text">{value}</div>
                                                        <div class="g2-legend-text" style="font-size: 22px">完成率131313</div>
                                                    </div>
                                                </li>
                                            `}
                                        />
                                    </React.Fragment>
                                }
                            />
                            <div className={styles.chartFooter}>
                                <div>
                                    <span>当月营业额：</span>
                                    <span>221223.00</span>
                                </div>
                                <div>
                                    <span>当月客单：</span>
                                    <span>11.02</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.rightContainer}>
                        <div></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
