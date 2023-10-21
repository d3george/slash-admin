import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';

import { CircleLoading } from '@/components/loading';
import SimpleLayout from '@/layouts/simple';

import { AppRouteObject } from '#/router';

const Page403 = lazy(() => import('@/pages/sys/error/Page403'));
const Page404 = lazy(() => import('@/pages/sys/error/Page404'));
const Page500 = lazy(() => import('@/pages/sys/error/Page500'));

/**
 * main routes
 */
export const mainRoutes: AppRouteObject = {
  element: (
    <SimpleLayout>
      <Suspense fallback={<CircleLoading />}>
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
