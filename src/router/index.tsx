import { Navigate, useRoutes } from 'react-router-dom';

import Blog from '@/pages/Blog';
import Dashboard from '@/pages/Dashboard';
import Page404 from '@/pages/Page404';
import Login from '@/pages/sys/login/Login';
import ReactQuery from '@/pages/test/ReactQuery';
import Zustand from '@/pages/test/Zustand';
import User from '@/pages/User';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'user', element: <User /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/test',
      children: [
        { element: <Navigate to="/test/zustand" />, index: true },
        { path: 'zustand', element: <Zustand /> },
        { path: 'react-query', element: <ReactQuery /> },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);
  return routes;
}
