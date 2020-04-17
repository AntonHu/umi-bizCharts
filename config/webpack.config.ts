/** 自定义增加的 webpack 配置 */

export const IF_BUILD: boolean = (process.env.BUILD_OPTION && true) || false; // 判断是不是 build打包操作
export const CHUNK_NAME = 'vendors'; // 拆分出来的chunk名称

// config webpack-chain对象
// env，当前环境，development、production 或 test 等
// webpack，webpack 实例，用于获取其内部插件
// createCSSRule，用于扩展其他 CSS 实现，比如 sass, stylus
const chainWebpackConfig = (config, { env, webpack, createCSSRule }) => {
    const newConfig = {};

    // 打包操作 进行 chunks 拆分配置 optimization 属性
    IF_BUILD &&
        Object.defineProperty(newConfig, 'optimization', {
            value: {
                minimize: true,
                splitChunks: {
                    chunks: 'all',
                    minSize: 30000,
                    minChunks: 2, // 将至少有2个chunk引入的模块进行拆分,作用于所有 cacheGroups
                    maxAsyncRequests: 5, // 异步模块内部的并行最大请求数
                    maxInitialRequests: 3, // 允许入口并行加载的最大请求数
                    automaticNameDelimiter: '~',
                    name: true,
                    cacheGroups: {
                        // 缓存组
                        vendors: {
                            name: CHUNK_NAME,
                            test: /[\\/]node_modules[\\/]/, // 缓存组条件
                            priority: -10 // 处理权重，如果一个模块同时符合多个 缓存组条件，则以权重高的优先拆分
                        },
                        default: {
                            minChunks: 2, // 覆盖外面的 minChunks
                            priority: -20,
                            reuseExistingChunk: true
                        }
                    }
                }
            }
        });
    config.merge(newConfig);
};

export default chainWebpackConfig;
