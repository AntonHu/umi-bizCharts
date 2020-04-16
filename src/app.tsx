import { history } from 'umi';
import React from 'react';
import { Provider } from 'mobx-react';
import store from '@/store';

/**
 * 改写整个应用render到dom树里。
 * 可能场景：
 *  1. 在渲染应用之前做权限校验，不通过则跳转到登录页（单点登录场景会很有用）
 *  2. 和pathRoutes配合，在render时请求后端接口，拿到动态路由
 * @param oldRender
 */
export async function render(oldRender: Function) {
  const isLogin = true;
  if (isLogin) {
    oldRender();
  } else {
    history.push('/');
  }
}

/**
 * 修改交给 react-dom 渲染时的根组件。
 * 比如用于在外面包一个 Provider，
 * @param container
 */
export function rootContainer(container: React.ReactNode) {
  // 包装 mobx 的 Provider
  const providerDom = <Provider {...store}>{container}</Provider>;
  return providerDom;
}
