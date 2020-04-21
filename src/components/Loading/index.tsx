/*
 * @文件描述: 加载中组件
 * @作者: Anton
 * @Date: 2020-04-16 19:01:42
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-20 16:16:37
 */

import React from 'react';
import { Spin } from 'antd';

interface IParams {
    ifShow: boolean;
    children: React.ReactNode;
}

const Loading = ({ children, ifShow }: IParams): React.ReactNode => {
    return (
        <Spin
            spinning={ifShow}
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {children}
        </Spin>
    );
};

export default Loading;
