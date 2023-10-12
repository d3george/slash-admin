import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const ClipboardPage = lazy(() => import('@/pages/functions/clipboard'));

const functions: AppRouteObject = {
  order: 4,
  path: 'functions',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    title: 'sys.menu.functions',
    icon: (
      <Iconify
        icon="fluent-mdl2:functional-manager-dashboard"
        className="ant-menu-item-icon"
        size="24"
      />
    ),
    key: '/functions',
  },
  children: [
    {
      index: true,
      element: <Navigate to="clipboard" replace />,
    },
    {
      path: 'clipboard',
      element: <ClipboardPage />,
      meta: { title: 'sys.menu.clipboard', key: '/functions/clipboard' },
    },
  ],
};

export default functions;
