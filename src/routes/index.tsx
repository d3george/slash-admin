import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';

import Loading from '@/components/app/Loading';

const lazyLoad = (Component: any) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const Blog = lazy(() => import('@/pages/Blog'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Page404 = lazy(() => import('@/pages/Page404'));
const Login = lazy(() => import('@/pages/sys/login/Login'));
const AuthenticatedRoute = lazy(() => import('./AuthenticatedRoute'));
const User = lazy(() => import('@/pages/User'));

const routesForPublic: RouteObject[] = [];
const routesForAuthenticatedOnly: RouteObject[] = [
  {
    path: '/',
    element: <AuthenticatedRoute />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: lazyLoad(Dashboard), index: true },
      { path: 'user', element: lazyLoad(User) },
      { path: 'blog', element: lazyLoad(Blog) },
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
