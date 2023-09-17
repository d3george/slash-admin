import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Loading from '@/components/loading';

import { AppRouteObject } from '#/router';

const Animate = lazy(() => import('@/pages/components/animate'));
const Scroll = lazy(() => import('@/pages/components/scroll'));

const components: AppRouteObject = {
  order: 3,
  path: 'components',
  element: (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  ),
  meta: { title: 'sys.menu.components', icon: 'ic-management', key: '/components' },
  children: [
    {
      index: true,
      element: <Navigate to="animate" replace />,
    },
    {
      path: 'animate',
      element: <Animate />,
      meta: { title: 'sys.menu.animate', icon: 'ic-user', key: '/components/animate' },
    },
    {
      path: 'scroll',
      element: <Scroll />,
      meta: { title: 'sys.menu.scroll', icon: 'ic-user', key: '/components/scroll' },
    },
  ],
};

export default components;
