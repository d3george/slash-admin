import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import AuthRouter from './AuthRouter';

import { AppRouteObject } from '#/router';

const Page404 = lazy(() => import('@/pages/Page404'));
const Login = lazy(() => import('@/pages/sys/login/Login'));

// 基于 src/router/routes/modules 文件结构动态生成路由
const modules = import.meta.glob('./modules/**/*.tsx', { eager: true });
const routeModuleList: AppRouteObject[] = [];

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = (modules as any)[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

// root
export const RootRoute: AppRouteObject = {
  path: '/',
  element: <AuthRouter />,
  children: [{ index: true, element: <Navigate to="dashboard" replace /> }, ...routeModuleList],
};
// login
export const LoginRoute: AppRouteObject = { path: '/login', element: <Login /> };
// 404
export const PageNotFoundRoute: AppRouteObject = { path: '*', element: <Page404 /> };
// Basic routing without permission
export const basicRoutes = [LoginRoute, RootRoute, PageNotFoundRoute];

export const asyncRoutes = [RootRoute, PageNotFoundRoute];
