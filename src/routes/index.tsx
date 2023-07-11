import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';

import Blog from '@/pages/Blog';
import Dashboard from '@/pages/Dashboard';
import Page404 from '@/pages/Page404';
import Login from '@/pages/sys/login/Login';
import User from '@/pages/User';

import AuthenticatedRoute from './AuthenticatedRoute';

const routesForPublic: RouteObject[] = [];
const routesForAuthenticatedOnly: RouteObject[] = [
  {
    path: '/',
    element: <AuthenticatedRoute />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard />, index: true },
      { path: 'user', element: <User /> },
      { path: 'blog', element: <Blog /> },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
];
// 仅用于未通过身份验证的路由
const routesForNotAuthenticatedOnly: RouteObject[] = [{ path: '/login', element: <Login /> }];

const routes: RouteObject[] = [
  ...routesForPublic,
  ...routesForNotAuthenticatedOnly,
  ...routesForAuthenticatedOnly,
];

function Routes() {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export { routesForAuthenticatedOnly, routesForNotAuthenticatedOnly, routesForPublic };
export default Routes;
