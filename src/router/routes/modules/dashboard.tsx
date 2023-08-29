import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loading from '@/components/app/Loading';

import { AppRouteObject } from '#/router';

const lazyLoad = (Component: any) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);
const Workbench = lazy(() => import('@/pages/dashboard/workbench'));
const Analysis = lazy(() => import('@/pages/dashboard/analysis'));

const dashboard: AppRouteObject = {
  path: '/dashboard',
  meta: { title: 'sys.menu.dashboard', icon: 'ic-dashboard', key: '/dashboard' },
  children: [
    {
      index: true,
      element: <Navigate to="workbench" replace />,
    },
    {
      path: 'workbench',
      element: lazyLoad(Workbench),
      meta: { title: 'sys.menu.workbench', icon: 'ic-workbench', key: '/dashboard/workbench' },
    },
    {
      path: 'analysis',
      element: lazyLoad(Analysis),
      meta: { title: 'sys.menu.analysis', icon: 'ic-analysis', key: '/dashboard/analysis' },
    },
  ],
};

export default dashboard;
