# 四项指标项目
> 开发栈：umi + react + mobx + antd + typescript + less
> 
> 辅助工具：eslint + prettier + mock
#### 1. 框架 umi + react：
react就不说了，umi内置webapck打包、路由方案、网络请求（基于fetch封装的umi-request）、数据管理dva（未使用，基于redux-saga繁琐）
#### 2. 数据管理 mobx：
双向绑定，使用装饰器的形式，简洁易用
#### 3. 样式库 antd：
umi内置antd，如果样式与设计稿差别较大也可以自己封装组件
#### 4. 开发语言：
umi内置typescript、less、CSS Module
#### 5. 其他：
umi内置工具：eslint（代码检查）、prettier（风格检查）、yorkie（获取git钩子）、mock（模拟接口）

## 启动项目
#### 以下指令均视作你已 cd 到 项目根目录下

安装依赖
```bash
$ npm install
```
以测试/生产环境启动服务
```bash
$ npm run start:dev
$ npm run start:prod
```
以测试/生产环境打包，输出到目录 测试 **devBuild**，生产 **prodBuild**
```bash
$ npm run build:dev
$ npm run build:prod
```
以打包文件启动服务，如果没有安装过serve，需要先全局安装serve
```bash
$ npm install -g serve
```
然后指定启动服务的目录
```bash
$ serve devBuild
$ serve prodBuild
```
其他更多指令可以看package.json的scripts，或自行添加

## 项目结构
```
.
├── config ------------------- umi的配置文件
    ├── config.dev.ts -------- 测试环境配置
    ├── config.prod.ts ------- 生产环境配置
    ├── config.ts ------------ 通用配置 
    └── routes.config.ts ----- 路由配置
├── devBuild ----------------- 测试环境打包目录
├── prodBuild ---------------- 生产环境打包目录
├── mock --------------------- mock目录
├── public ------------------- 静态文件，打包时会自动copy到输出目录
├── src ---------------------- 主要的开发路径
    ├── .umi ----------------- umi运行时代码，启动服务/修改代码会自动重新生成，不要修改，不要上传
    ├── components ----------- 封装的组件
    ├── layouts -------------- 导航菜单
    ├── pages ---------------- 页面
        └── documents.ejs ---- html模版，umi自动根据该模版输出html文件，例如meta,title,link,script等可以在这里编写
    ├── store ---------------- 数据模型 本项目使用mobx做数据管理
        └── index.ts --------- 完整的store导出文件
    ├── utils ---------------- 开发常用工具类
        ├── constant.ts ------ 常量尽量都写在这里，例如TOKEN，SESSION，OPENID
        ├── methods.ts ------- 常用的方法类
        └── request.ts ------- 通用请求的封装
    ├── app.tsx -------------- 项目运行时处理，可以理解为入口文件
    └── global.less ---------- 全局样式，无需配置，umi自动引入
├── .editorconfig ------------ 所有文件的编写风格规则，eslint只针对js相关文件
├── .env --------------------- umi环境变量配置
├── .eslintignore ------------ eslint忽略配置
├── .eslintrc.js ------------- eslint规则
├── .gitignore --------------- git忽略配置
├── .prettierignore ---------- prettier忽略配置
├── .prettierrc -------------- prettier规则
├── package-lock.json -------- 依赖的缓存文件，锁定依赖版本等信息，加速依赖安装
├── package.json ------------- 项目配置，依赖配置
├── README.md ---------------- 项目介绍markdown
├── tsconfig.json ------------ typescript规则
└── typings.d.ts ------------- 全局声明，在这里声明的内容，可以在整个项目中被typescript识别
```