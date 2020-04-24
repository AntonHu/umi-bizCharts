import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC<{}> = () => (
    <Result
        status="404"
        title="未找到页面"
        subTitle="抱歉, 您想要访问的页面不存在！"
        extra={
            <Button type="primary" onClick={() => history.push('/')}>
                返回主页
            </Button>
        }
    />
);

export default NoFoundPage;
