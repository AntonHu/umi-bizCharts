/*
 * @文件描述: 复合图表组件 支持折线、柱状、面积、点图的组合
 * @作者: Anton
 * @Date: 2020-04-20 18:11:58
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-24 20:51:03
 */
import React, { ReactText } from 'react';
import { Chart, Geom, Tooltip } from 'bizcharts';
import useCustTooltip from 'bx-tooltip';
import styles from './index.less';

// 图表类型限定
export enum GEOM_TYPE {
    LINE = 'line', // 折线图
    LINE_STACK = 'lineStack', // 层叠折线图
    INTERVAL = 'interval', // 区间图
    INTERVAL_STACK = 'intervalStack', // 层叠区间图
    POINT = 'point', // 点图
    POINT_STACK = 'pointStack', // 层叠点图
    AREA = 'area', // 面积图
    AREA_STACK = 'areaStack' // 层叠面积图
}

// 图形配置项 例如多折线，则该对象为其中一条的配置，且至少需要一条折线的配置
export interface IConfigItem {
    typeKey: string; // 字段名
    typeName: string; // 名称
    color: string; // 颜色
}

// 图表对象
export interface IGeom {
    type: GEOM_TYPE; // 图表类型
    size?: number; // 折线图 线宽
    adjust?: string; // 调整 例如使层叠分组散开
    configList: Array<IConfigItem>; // 配置列表
}

interface IProps {
    parentDom: HTMLElement | null; // 为了动态变化高度，需要获取父节点的dom来计算
    data: Array<Record<string, any>>;
    xKeyName: string; // 横坐标字段名称
    yKeyName: string; // 纵坐标字段名称
    geomList: Array<IGeom>; // geom列表
    padding?:
        | string
        | number
        | { top: number; right: number; bottom: number; left: number }
        | [ReactText, ReactText, ReactText, ReactText]
        | [string, string]
        | undefined; // 边距
    scale?: Record<string, any>; // 配置数据比例尺 坐标轴配置
    className?: string; // 类名
    chartChildren?: React.ReactNode; // 自行增加Chart子节点 例如Axis Legend
    geomChildren?: React.ReactNode; // 自行增加的Geom子节点 例如Label
    showToolTip?: boolean; // 是否添加toolTip
    // 使用bx-tooltip自定义tooltips 参数 dom 是tooltip最外层的节点
    setToolTip?: (title: string, items: Record<string, any>, dom?: HTMLElement) => React.ReactNode;
}

interface IState {
    geomData: Array<any>; // 整理后的data
}

class CompoundChart extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            geomData: []
        };
    }

    componentDidUpdate(preProps: IProps) {
        if (preProps.data !== this.props.data) {
            this.recombineData();
        }
    }

    // 整理数据，使其变成 [{ type: [以某个字段进行分类], [xKeyName]: [横坐标值], [yKeyName]: [纵坐标值] }] 的数据类型
    recombineData = () => {
        try {
            const newData: Array<Record<string, any>> = [];
            const { data, xKeyName, yKeyName, geomList } = this.props;
            data.forEach(dataItem =>
                // 遍历data进行数据重组
                geomList.forEach(typeItem =>
                    // 对每一种图表类型进行处理
                    typeItem.configList.forEach(configItem => {
                        // 对每一个图形进行处理
                        newData.push({
                            type: configItem.typeName,
                            [xKeyName]: dataItem[xKeyName],
                            [yKeyName]: dataItem[configItem.typeKey]
                        });
                    })
                )
            );
            this.setState({ geomData: newData });
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const {
            parentDom,
            scale,
            xKeyName,
            yKeyName,
            geomList,
            padding,
            className,
            chartChildren,
            geomChildren,
            showToolTip,
            setToolTip
        } = this.props;
        const { geomData } = this.state;
        console.log(parentDom?.clientHeight);
        const chartProps = {
            height: parentDom?.clientHeight || 0,
            className: `${styles.chartContainer} ${className ? className : ''}`,
            scale: scale,
            data: geomData,
            forceFit: true,
            placeholder: true, // 源码bug placeholder必须为true 才会显示默认的empty样式，且自定义jsx会报递归错误
            padding: padding || 'auto'
        };
        const [BxChart, CustTooltip] = useCustTooltip.create(Chart, Tooltip);
        const chartContent = (
            <React.Fragment>
                {geomList.map((geomItem, index) => (
                    <Geom
                        key={index}
                        type={geomItem.type}
                        // shape="smooth"
                        size={geomItem.size}
                        adjust={geomItem.adjust}
                        position={`${xKeyName}*${yKeyName}`}
                        color={['type', geomItem.configList.map(configItem => configItem.color)]}
                    >
                        {geomChildren}
                    </Geom>
                ))}
                {showToolTip ? setToolTip ? <CustTooltip enterable>{setToolTip}</CustTooltip> : <Tooltip /> : null}
                {chartChildren}
                {/* {(title, items) => {
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
                }} */}
            </React.Fragment>
        );
        return setToolTip ? (
            <BxChart {...chartProps}>{chartContent}</BxChart>
        ) : (
            <Chart {...chartProps}>{chartContent}</Chart>
        );
    }
}

export default CompoundChart;
