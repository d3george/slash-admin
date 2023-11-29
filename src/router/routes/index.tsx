import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import { DynamicRoutes } from './dynamic-routes';
import { ErrorRoutes } from './error-routes';

import { AppRouteObject } from '#/router';

export const LoginRoute: AppRouteObject = {
  path: '/login',
  Component: lazy(() => import('@/pages/sys/login/Login')),
};
export const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
  path: '*',
  element: <Navigate to="/404" replace />,
};

export const routes = [LoginRoute, DynamicRoutes, ErrorRoutes, PAGE_NOT_FOUND_ROUTE];
