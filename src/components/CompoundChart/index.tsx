/*
 * @文件描述: 复合图表组件 支持折线、柱状、面积、点图的组合
 * @作者: Anton
 * @Date: 2020-04-20 18:11:58
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-21 18:42:58
 */
import React, { ReactText } from 'react';
import { Chart, Geom, Tooltip } from 'bizcharts';

// 图表类型限定
export enum GEOM_TYPE {
    LINE = 'line', // 折线图
    INTERVAL = 'interval', // 柱状图
    POINT = 'point', // 点图
    AREA = 'area' // 面积图
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
    configList: Array<IConfigItem>; // 配置列表
}

interface IProps {
    height: number;
    data: Array<Record<string, string | number>>;
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
    scale?: Record<string, unknown>; // 配置数据比例尺 坐标轴配置
    className?: string; // 类名
    chartChildren?: React.ReactNode; // 自行增加Chart子节点 建议用来覆盖ToolTip Axis Legend
    geomChildren?: React.ReactNode; // 自行增加的Geom子节点 例如Label
}

interface IState {
    geomData: Array<Record<string, unknown>>; // 整理后的data
}

class CompoundChart extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            geomData: []
        };
    }
    componentDidMount() {
        this.recombineData();
    }

    // 整理数据，使其变成 [{ type: [以某个字段进行分类], [xKeyName]: [横坐标值], [yKeyName]: [纵坐标值] }] 的数据类型
    recombineData = () => {
        const newData: Array<Record<string, unknown>> = [];
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
    };

    render() {
        const {
            height,
            xKeyName,
            yKeyName,
            geomList,
            scale,
            padding,
            className,
            chartChildren,
            geomChildren
        } = this.props;
        const { geomData } = this.state;
        // 无数据时的样式
        const placeholder = <div style={{ position: 'relative', top: '48%', textAlign: 'center' }}>暂无数据</div>;
        return (
            <Chart
                forceFit
                height={height}
                data={geomData}
                scale={scale}
                placeholder={placeholder}
                padding={padding || 'auto'}
                className={className}
            >
                {geomList.map((geomItem, index) => (
                    <Geom
                        key={index}
                        type={geomItem.type}
                        shape="smooth"
                        size={geomItem.size}
                        position={`${xKeyName}*${yKeyName}`}
                        color={['type', geomItem.configList.map(configItem => configItem.color)]}
                    >
                        {geomChildren}
                    </Geom>
                ))}
                <Tooltip />
                {chartChildren}
            </Chart>
        );
    }
}

export default CompoundChart;
