import { defineConfig } from 'umi';
import routesConfig from './routes.config';

// defineConfig 可以让 config 在编辑时有提示信息
const config = defineConfig({
    title: '四项指标系统',
    hash: true, // css js 文件加hash
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
    dynamicImport: {
        // 按需加载 以loading为初始页面
        loading: '@/components/Loading'
    }
});

export default config;
