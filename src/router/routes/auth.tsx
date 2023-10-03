import { lazy } from 'react';

import { AppRouteObject } from '#/router';

const Login = lazy(() => import('@/pages/sys/login/Login'));
/**
 * auth route
 */
export const authRoutes: AppRouteObject = { path: '/login', element: <Login /> };
