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
