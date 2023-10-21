import { Navigate } from 'react-router-dom';

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
      <DashboardLayout />
    </AuthGuard>
  ),
  children: [{ index: true, element: <Navigate to="dashboard" replace /> }, ...moduleList],
};
