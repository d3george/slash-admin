import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Loading from '@/components/loading';

import { AppRouteObject } from '#/router';

const IndexPage = lazy(() => import('@/pages/management/user'));
const Blog = lazy(() => import('@/pages/management/blog'));

const management: AppRouteObject = {
  order: 2,
  path: 'management',
  element: (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  ),
  meta: { title: 'sys.menu.management', icon: 'ic-management', key: '/management' },
  children: [
    {
      index: true,
      element: <Navigate to="user" replace />,
    },
    {
      path: 'user',
      element: <IndexPage />,
      meta: { title: 'sys.menu.user', icon: 'ic-user', key: '/management/user' },
    },
    {
      path: 'blog',
      element: <Blog />,
      meta: { title: 'sys.menu.blog', icon: 'ic-blog', key: '/management/blog' },
    },
  ],
};

export default management;
