import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Loading from '@/components/loading';

import { AppRouteObject } from '#/router';

const AnimatePage = lazy(() => import('@/pages/components/animate'));
const ScrollPage = lazy(() => import('@/pages/components/scroll'));
const MarkdownPage = lazy(() => import('@/pages/components/markdown'));

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
      element: <AnimatePage />,
      meta: { title: 'sys.menu.animate', icon: 'ic-user', key: '/components/animate' },
    },
    {
      path: 'scroll',
      element: <ScrollPage />,
      meta: { title: 'sys.menu.scroll', icon: 'ic-user', key: '/components/scroll' },
    },
    {
      path: 'markdown',
      element: <MarkdownPage />,
      meta: { title: 'sys.menu.markdown', icon: 'ic-user', key: '/components/markdown' },
    },
  ],
};

export default components;
