import { defineConfig, IConfig } from 'umi';
import routesConfig from './routes.config';

const config = defineConfig({
  title: '四项指标系统',
  autoprefixer: {
    browsers: ['> 1%', 'last 2 versions', 'not ie <= 10'],
  },
  targets: {
    chrome: 49,
    firefox: 45,
    safari: 10,
    edge: 13,
    ios: 10,
    ie: 10,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routesConfig,
});

export default config;