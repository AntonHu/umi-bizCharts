/*
 * @文件描述: umi config 配置
 * @作者: Anton
 * @Date: 2020-04-17 19:28:36
 * @LastEditors: Anton
 * @LastEditTime: 2020-04-20 16:16:14
 */
import { defineConfig } from 'umi';
import webpackConfig, { IF_BUILD, CHUNK_NAME } from './webpack.config';
import routesConfig from './routes.config';

// defineConfig 可以让 config 在编辑时有提示信息
const config = defineConfig({
    title: '四项指标系统',
    hash: true, // css js 文件加hash
    history: { type: 'hash' },
    routes: routesConfig,
    autoprefixer: {
        browsers: ['> 1%', 'last 2 versions', 'not ie <= 10']
    },
    targets: {
        chrome: 49,
        firefox: 45,
        safari: 10,
        edge: 13,
        ios: 10,
        ie: 10
    },
    nodeModulesTransform: {
        // 设置 node_modules 目录下依赖文件的编译方式
        // none 只编译 es5-imcompatible-versions 里声明的依赖
        type: 'none'
    },
    // 如果是build打包操作，拆分chunks，开启按需加载
    ...(IF_BUILD && {
        dynamicImport: {
            // 按需加载 以loading为初始页面
            loading: '@/components/Loading'
        },
        chunks: [CHUNK_NAME, 'umi']
    }),
    chainWebpack: webpackConfig
});

export default config;
