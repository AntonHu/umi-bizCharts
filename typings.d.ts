// typescript 只认识js ts的模块，其他格式的模块需要声明
declare module '*.css';
declare module '*.less';
declare module '*.png';

interface IAppConfig {
  APPID_QP: string; //壳牌华北小程序id
  APP_SERVICE: string; // 接口api
  WECHAT2_APP_URL: string;
  STATIC_URL: string; // oss地址
  HOME_STATIC: string; //本地服务器静态文件目录
  IMG_URL: string;
  IMG_BIG_URL: string;
  PINGAN_URL: string; //平安好车主的域名
  BPPC_URL: string; //中油BP的域名
}

// APP_CONFIG 定义在 config define 的环境变量中，需要声明typescript才能识别
declare var APP_CONFIG: IAppConfig;
