import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import Loading from '@/components/loading';
import DashboardLayout from '@/layouts/dashboard';

import AuthGuard from '../components/auth-guard';
import { getMenuModules } from '../utils';

import { AppRouteObject } from '#/router';

const moduleList = getMenuModules();

/**
 * main routes
 */
export const moduleRoutes: AppRouteObject = {
  path: '/',
  element: (
    <AuthGuard>
      <Suspense fallback={<Loading />}>
        <DashboardLayout />
      </Suspense>
    </AuthGuard>
  ),
  children: [{ index: true, element: <Navigate to="dashboard" replace /> }, ...moduleList],
};
