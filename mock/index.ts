/*
 * @文件描述: mock的公用方法
 * @作者: Anton
 * @Date: 2020-04-22 09:25:57
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-22 09:26:27
 */
/**
 * 响应处理
 * @param data mock数据
 * @param time 响应延时ms
 */
export const resHandler = (data: any, time?: number) => (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    setTimeout(() => {
        res.send(data);
    }, time || 1000);
};
