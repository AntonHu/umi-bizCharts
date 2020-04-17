# 四项指标项目

> 开发栈：Umi + React + Mobx + TypeScript + Less + AntDesign
> 
> 辅助工具：EsLint + Prettier + Lint-Staged + Yorkie + Mock

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
## 开发指南

#### 1. 打包配置：

Umi基于webpack封装，通过[config配置项](https://umijs.org/zh-CN/config)可以满足大部分基础需求，如果需要增加自定义的webpack配置，可以在 config 中增加 chainWebpack 配置：

```ts
// 示例config.js
const config = defineConfig({
    // 其他配置
    ...,
    // memo，当前 webpack-chain对象
    // env，当前环境，development、production 或 test 等
    // webpack，webpack 实例，用于获取其内部插件
    // createCSSRule，用于扩展其他 CSS 实现，比如 sass, stylus
    chainWebpack(memo, { env, webpack, createCSSRule }) {
        // 设置 alias
        memo.resolve.alias.set('foo', '/tmp/a/b/foo');

        // 删除 umi 内置插件
        memo.plugins.delete('progress');
        memo.plugins.delete('friendly-error');
        memo.plugins.delete('copy');
    }
});
```

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
> **使用**：git commit 操作前会对代码进行 Eslint 检查，不通过则拒绝本次 commit

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

## 提示
1. tsx的书写建议，使用 ES6箭头函数 书写组件函数，这样可以省略 this 的 bind 操作，同时 this 的指向也更清晰：
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