export default {
    define: {
        APP_CONFIG: {
            APPID_QP: 'wx525c1aa33476c7d9', //壳牌华北小程序id
            APP_SERVICE: 'https://api.1kmxc.com/appservice/',
            WECHAT2_APP_URL: 'https://wechat.1kmxc.com/',
            STATIC_URL: 'https://source.1kmxc.com/static-web-new/',
            HOME_STATIC: 'https://home-static.1kmxc.com/', //本地服务器静态文件目录
            IMG_URL: 'https://source.1kmxc.com/',
            IMG_BIG_URL: 'https://source.1kmxc.com/Big/',
            PINGAN_URL: 'https://icore-vass-client.pingan.com/', //平安好车主的域名
            BPPC_URL: 'https://ppst02.bppc.com.cn' //中油BP的域名
        }
    },
    mock: false,
    hash: true,
    outputPath: './prodBuild'
};
