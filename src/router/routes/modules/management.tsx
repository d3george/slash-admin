import { Suspense, lazy } from 'react';

import Loading from '@/components/app/Loading';

import { AppRouteObject } from '#/router';

const lazyLoad = (Component: any) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);
const User = lazy(() => import('@/pages/management/user'));
const Blog = lazy(() => import('@/pages/management/blog'));

const management: AppRouteObject = {
  path: '/management',
  meta: { title: 'sys.menu.management', icon: 'ic-dashboard' },
  children: [
    {
      index: true,
      path: 'user',
      element: lazyLoad(User),
      meta: { title: 'sys.menu.user', icon: 'ic-user' },
    },
    {
      path: 'blog',
      element: lazyLoad(Blog),
      meta: { title: 'sys.menu.blog', icon: 'ic-blog' },
    },
  ],
};

export default management;
