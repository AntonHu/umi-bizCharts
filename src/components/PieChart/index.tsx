/*
 * @文件描述: 饼图 环形图组件
 * @作者: Anton
 * @Date: 2020-04-22 14:18:53
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-23 15:44:57
 */
import React, { ReactText } from 'react';
import { findDOMNode } from 'react-dom';
import { Chart, Geom, Tooltip, Coord } from 'bizcharts';
import useCustTooltip from 'bx-tooltip';
import DataSet from '@antv/data-set';
import styles from './index.less';

// 一个item代表一个类型，针对类型进行分组计算百分比，可以配置类型的字段名 显示的标题名 颜色
export interface IConfigItem {
    typeKey: string; // 字段名
    typeName: string; // 名称
    color: string; // 颜色
}

interface IProps {
    ifResize: boolean; // 当窗口尺寸变化，取反该值来重新设置图表的高度
    data: Array<Record<string, any>>;
    configList: Array<IConfigItem>; // 配置列表
    radius?: number; // 设置圆的半径，相对值，0 至 1 范围
    innerRadius?: number; // 绘制环图时，设置内部空心半径，相对值，0 至 1 范围
    padding?:
        | string
        | number
        | { top: number; right: number; bottom: number; left: number }
        | [ReactText, ReactText, ReactText, ReactText]
        | [string, string]
        | undefined; // 边距
    scale?: Record<string, any>; // 配置数据比例尺 坐标轴配置
    className?: string; // 类名
    chartChildren?: React.ReactNode; // 自行增加Chart子节点 建议用来覆盖ToolTip Axis Legend
    geomChildren?: React.ReactNode; // 自行增加的Geom子节点 例如Label
    showToolTip?: boolean; // 是否添加toolTip
    setToolTip?: (title: string, items: Record<string, any>, dom?: HTMLElement) => React.ReactNode; // 自定义tooltips dom是tooltip最外层的节点
}

interface IState {
    height: number; // chart高度
    geomData: any; // 最终放在饼图展示的百分比数据
}

const REF_NAME = 'chartContainer'; // 通过该ref名称查找到图表的最外层 dom节点，从而获取高度

class PieChart extends React.Component<IProps, IState> {
    private chartContainer: Element | Text | null = null; // 图表的最外层 dom节点

    constructor(props: IProps) {
        super(props);
        this.state = {
            height: 0,
            geomData: []
        };
    }

    componentDidMount() {
        this.chartContainer = findDOMNode(this.refs[REF_NAME]);
        this.setChartHeight();
    }

    componentDidUpdate(preProps: IProps) {
        if (preProps.data !== this.props.data) {
            this.recombineData();
        }
        if (preProps.ifResize !== this.props.ifResize) {
            this.setChartHeight();
        }
    }

    setChartHeight = () => {
        const _this = this;
        _this.setState({
            height: _this.chartContainer?.clientHeight || 0
        });
    };

    // 整理数据，使其变成 [{ type: [以某个字段进行分类], [xKeyName]: [横坐标值], [yKeyName]: [纵坐标值] }] 的数据类型
    recombineData = () => {
        try {
            const newData: Array<Record<string, any>> = [];
            const { data, configList } = this.props;
            data.forEach(dataItem =>
                // 遍历data进行数据重组
                configList.forEach(configItem => {
                    // 将dataItem 根据config 拆分
                    newData.push({
                        type: configItem.typeName,
                        value: dataItem[configItem.typeKey]
                    });
                })
            );
            this.percentHandler(newData);
        } catch (e) {
            console.log(e);
        }
    };

    // 将gemoData整理成percentData，计算 percent
    percentHandler = (data: Array<Record<string, any>>) => {
        try {
            const dv = new DataSet.View();
            dv.source(data).transform({
                type: 'percent', // 类型 百分比
                dimension: 'type', // 以 type 进行分类
                field: 'value', // 统计结果，将 type 相同的数据的 value累加得到
                as: 'percent' // 结果存储在 percent 字段
            });
            this.setState({ geomData: dv });
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const {
            scale,
            radius,
            innerRadius,
            padding,
            className,
            chartChildren,
            geomChildren,
            showToolTip,
            setToolTip
        } = this.props;
        const { height, geomData } = this.state;
        const [BxChart, CustTooltip] = useCustTooltip.create(Chart, Tooltip);
        const cols = {
            percent: {
                formatter: (val: number) => {
                    const percent = (val * 100).toFixed(2) + '%';
                    return percent;
                }
            }
        };
        const chartProps = {
            height,
            ref: REF_NAME,
            className: `${styles.chartContainer} ${className ? className : ''}`,
            scale: scale || cols,
            data: geomData,
            forceFit: true,
            placeholder: true, // 源码bug placeholder必须为true 才会显示默认的empty样式，且自定义jsx会报递归错误
            padding: padding || 'auto'
        };
        const chartContent = (
            <React.Fragment>
                <Coord type="theta" radius={radius || 1} innerRadius={innerRadius || 0} />
                <Geom type="intervalStack" position="percent" color="type">
                    {geomChildren}
                </Geom>
                {showToolTip ? (
                    setToolTip ? (
                        <CustTooltip enterable>{setToolTip}</CustTooltip>
                    ) : (
                        <Tooltip showTitle={false} />
                    )
                ) : null}
                {chartChildren}
            </React.Fragment>
        );
        return setToolTip ? (
            <BxChart {...chartProps}>{chartContent}</BxChart>
        ) : (
            <Chart {...chartProps}>{chartContent}</Chart>
        );
    }
}

export default PieChart;
