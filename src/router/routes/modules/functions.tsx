import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Loading from '@/components/loading';

import { AppRouteObject } from '#/router';

const ClipboardPage = lazy(() => import('@/pages/functions/clipboard'));

const functions: AppRouteObject = {
  order: 4,
  path: 'functions',
  element: (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  ),
  meta: { title: 'sys.menu.functions', icon: 'ic-management', key: '/functions' },
  children: [
    {
      index: true,
      element: <Navigate to="copy" replace />,
    },
    {
      path: 'clipboard',
      element: <ClipboardPage />,
      meta: { title: 'sys.menu.clipboard', key: '/functions/clipboard' },
    },
  ],
};

export default functions;
