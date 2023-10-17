import { lazy } from 'react';

import Card from '@/components/card';
import { SvgIcon } from '@/components/icon';

import { AppRouteObject } from '#/router';

const ExternalLink = lazy(() => import('@/pages/sys/iframe/external-link'));
const Iframe = lazy(() => import('@/pages/sys/iframe'));

const others: AppRouteObject[] = [
  {
    element: <div />,
    meta: {
      title: 'sys.menu.disabled',
      icon: <SvgIcon icon="ic_disabled" className="ant-menu-item-icon" size="24" />,
      disabled: true,
      key: '/disabled',
    },
  },
  {
    path: 'frame',
    meta: {
      title: 'sys.menu.frame',
      icon: <SvgIcon icon="ic_external" className="ant-menu-item-icon" size="24" />,
      key: '/frame',
    },
    children: [
      {
        path: 'external_link',
        element: <ExternalLink to="https://ant.design/index-cn" />,
        meta: {
          title: 'sys.menu.external_link',
          key: '/frame/external_link',
        },
      },
      {
        path: 'iframe',
        element: <Iframe src="https://ant.design/index-cn" />,
        meta: {
          title: 'sys.menu.iframe',
          key: '/frame/iframe',
        },
      },
    ],
  },
  {
    path: 'blank',
    element: <Card />,
    meta: {
      title: 'sys.menu.blank',
      icon: <SvgIcon icon="ic_blank" className="ant-menu-item-icon" size="24" />,
      key: '/blank',
    },
  },
];

export default others;
