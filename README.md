# 四项指标项目

> 开发栈：Umi + React + Mobx + TypeScript + Less + AntDesign + BizCharts
> 
> 辅助工具：EsLint(js检查) + Prettier(风格检查) + Lint-Staged(lint缓存管理) + Yorkie(提供git钩子) + Mock(接口模拟)

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
    ├── routes.config.ts ----- 路由配置
    └── webpack.config.ts ---- 自定义的 webpack 配置
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
    ├── styles --------------- 常用样式
        └── common.less ------ 通用样式
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


## 开发指南
#### 1. 菜单项配置
配置路径 **config/routes.config.ts** ，根路由的一级子路由就是菜单子项，具体如何配置请前往文件查看；

菜单操作，不需要手动设置点击事件、标题、选中样式等信息，因为在 **src/app.ts** 中，监听了路由变化，自动完成了菜单的一系列操作，详情可前往查看 **onRouteChange** 方法

#### 2. mock
当前配置，如果开启mock，则接口 **APP_SERVER** 将指向本地mock，目前仅在 **config/config.dev.ts** 配置了mock，即只在开发环境开启，如要在开发环境关闭mock，可前往该文件将 **mock = false** ：
```ts
// config/config.dev.ts
const MOCK: Record<string, string> | false = false; // mock=false 则关闭mock功能 mock=Object 则开启mock功能
```

#### 3. 页面权限
**src/app.ts** 中 **render** 方法可以在页面渲染前做一些处理，例如判断登录状态，判断用户权限，并进行下一步操作

#### 4. 静态资源
静态资源可以都放到 **public** 目录下，打包时会自动copy到打包路径中

#### 5. 箭头函数
tsx的书写建议，使用 ES6箭头函数 书写组件函数，这样可以省略 this 的 bind 操作，同时 this 的指向也更清晰：
```tsx
// tsx书写建议示例 test.tsx
class Test extends React.Component {

    // 不建议
    add_bad() {}
    set_bad(value) {}

    // 建议
    add_good = () => {}
    set_good = value => () => {}

    render() {
        return (
            <div>
                {/* 不建议 */}
                <div onClick={this.add_bad.bind(this)}>添加 不建议</div>
                <div onClick={this.set_bad.bind(1, this)}>设置 不建议</div>

                {/* 建议 */}
                <div onClick={this.add_good}>添加 建议</div>
                <div onClick={this.set_good(1)}>设置 建议</div>
            </div>
        );
    }
}
```

## 项目指南

#### 1. 打包配置：

Umi基于webpack封装，通过[config配置项](https://umijs.org/zh-CN/config)可以满足大部分基础需求，如果需要增加自定义的webpack配置，可以在 **config/webpack.config.ts** 中增加 chainWebpack 配置，写法请前往参考

#### 2. 数据管理：
本项目使用[Mobx](https://cn.mobx.js.org/)，双向绑定，没有繁琐的action type, dispatch流程，使用装饰器的形式，写法简洁清晰（Umi内置有dva插件，但是dva基于redux-saga使用繁琐，所以选择了Mobx）
```ts
// 示例store testStore.ts
import { observable, action, runInAction } from 'mobx';
import { get } from 'umi-request';

export class TestStore {
    // @observable 将属性设置为 可观测的
    @observable
    count = 0;

    // @action 使Mobx能捕捉到 可观测数据 的修改
    // 如果函数不对 可观测数据 进行操作则不需要 @action
    @action
    add = () => {
        this.count++;
    }

    @action
    getCount = async () => {
        const result = await get('/api/getCount');
        // runInAction 异步操作中，使Mobx能捕捉到 可观测数据 的修改
        // 如果非异步操作 则不需要 runInAction
        result.data && 
        runInAction(() => this.count = result.data );
    }
}
const testStore = new TestStore();
export default testStore;
```

```tsx
// 示例组件 test.tsx
import React from 'react';
import { inject, observer } from 'mobx-react';

// @inject 将store注入到组件中，然后就可以通过 
// this.props.store名称 访问到store
// @observer 将组件设置为 可观测的
@inject('testStore', 'otherStore')
@observer
class Test extends React.Component {
    componentDidMount() {
        this.props.testStore.getCount();
    }

    render() {
        return 
            <div 
                onClick={ this.props.testStore.add }
            >
                { this.props.testStore.count }
            </div>
    }
}

export default Test;
```
#### 3. 路由
Umi内置了 约定式路由 ，但是本项目采用 配置路由 的方式，在 **config/route.config.ts** 中自行配置路由信息，可参考已有路由进行配置

##### 关于路由拦截，权限路由，动态路由
在 src/app.tsx 中，可以进行 Umi运行时配置，你可以理解为入口文件，其中 [patchRoutes](https://umijs.org/zh-CN/docs/runtime-config#%E9%85%8D%E7%BD%AE%E9%A1%B9) 可以修改路由，[onRouteChange](https://umijs.org/zh-CN/docs/runtime-config#onroutechange-routes-matchedroutes-location-action-) 可以处理路由事件

#### 4. 样式开发
Umi内置了 Less、CssModule，本项目建议使用cssModule的形式，cssModule会将所有样式加上hash，从而解决样式作用域的问题：
```less
// cssModule示例less test.less

// :global 声明的样式不会被转成hash
:global {
    #page-test {
        width: 100%;
        height: 100%;
    }
}

.title {
    font-size: 20px;
}
```

```ts
// cssModule示例组件 test.tsx
import React from 'react';
// 将less转成 styles 对象使用
// 无需配置，Umi 自动识别
import styles from './index.less';

class Test extends React.Component {
    render() {
        return (
            <div id="page-test">
                <span className={styles.title}></span>
            </div>
        );
    }
}

export default Test;
```

你也可以不使用cssModule：

```less
// 常规less示例 test.less

#page-test {
    width: 100%;
    height: 100%;
}

.title {
    font-size: 20px;
}
```

```ts
// 常规less示例组件 test.tsx
import React from 'react';
// 直接引入less
import './index.less';

class Test extends React.Component {
    render() {
        return (
            <div id="page-test">
                <span className="title"></span>
            </div>
        );
    }
}

export default Test;
```

全局样式可以写在 **src/global.less** 里，Umi会自动引入
#### 4. 代码风格
Umi 里集成了 EsLint + Prettier + Lint-Staged + Yorkie，分别各司其职，合理的配置，对项目的开发风格有很好的统一作用

**Eslint**
> 代码检查，旨在检查js中存在的明显代码问题，规范上的问题，与Prettier重叠的，则以Prettier为准；
> 
> **配置**：.eslintrc.js EsLint配置 .eslintignore Eslint忽略配置
> 
> **使用**：git commit 操作前会对代码进行 Eslint 检查，不通过则拒绝本次 commit

**Prettier**
> 代码风格规范，旨在检查js、css、json、md等文件的书写风格，约束规范，
> 
> **配置**：.prettierrc.js Prettier配置 .prettierignore Prettier忽略配置
> 
> **使用**：
> 
> git commit 时 Eslint 检查通过后，再使用prettier进行格式的自动调整
> 
> 通过命令行，主动对整个项目的格式进行整理
> ```bash
> $ npm run prettier
> ```
> 
> 通过命令行，主动对单个文件进行整理
> ```bash
> $ npm run prettierSingle 文件路径
> ```

**Lint-Staged**
> 优化代码检查，从 git 本地缓存里比对文件，筛选出有变化的文件进行eslint prettier操作
> 
> **配置**：在 package.json 中配置 lint-staged 属性，可前往查看参考
> 
> **使用**：git commit 操作前比对本地 git缓存

**Yorkie**
> 提供git钩子，可监听 git 的操作事件，配置处理事件
> 
> **配置**：在 package.json 中配置 gitHooks 属性，可前往查看参考
> 
> **使用**：获取git commit事件，进行 pre-commit 操作

#### 5. Mock
使用 Mock 可以在本地模拟接口进行联调测试，Umi内置了mock的配置，不需要另外启动服务，只需要在 config 中配置是否启用：
```ts
// mock配置示例 config.ts
// mock 只允许两种类型 Object | false
// false 表示关闭mock功能 Object 表示开启
const MOCK: Object | false = {};

// 根据 mock 是否开启，切换接口地址
const MOCK_API = `http://localhost:${process.env.PORT}/`;

const config = {
    mock: MOCK,
    define: {
        APP_CONFIG: {
            APP_SERVICE: (MOCK && MOCK_API) || 'https://api-test.baidu.com/appservice/'
        }
    }
}
```