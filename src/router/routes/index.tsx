import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import SimpleLayout from '@/layouts/simple';

import AuthRouter from '../components/AuthRouter';

import { AppRouteObject } from '#/router';

const Page403 = lazy(() => import('@/pages/sys/error/Page403'));
const Page404 = lazy(() => import('@/pages/sys/error/Page404'));
const Page500 = lazy(() => import('@/pages/sys/error/Page500'));
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
// error
export const ErrorRoute: AppRouteObject = {
  element: (
    <SimpleLayout>
      <Suspense>
        <Outlet />
      </Suspense>
    </SimpleLayout>
  ),
  children: [
    { path: '404', element: <Page404 /> },
    { path: '403', element: <Page403 /> },
    { path: '500', element: <Page500 /> },
  ],
};
// Basic routing without permission
export const asyncRoutes = [
  LoginRoute,
  RootRoute,
  ErrorRoute,
  { path: '*', element: <Navigate to="/404" replace /> },
];
