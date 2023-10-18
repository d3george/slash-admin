import { lazy } from 'react';

import Card from '@/components/card';
import { Iconify, SvgIcon } from '@/components/icon';
import ProTag from '@/theme/antd/components/tag';

import { AppRouteObject } from '#/router';

const ExternalLink = lazy(() => import('@/pages/sys/iframe/external-link'));
const Iframe = lazy(() => import('@/pages/sys/iframe'));

const others: AppRouteObject[] = [
  {
    element: <div />,
    meta: {
      label: 'sys.menu.disabled',
      icon: <SvgIcon icon="ic_disabled" className="ant-menu-item-icon" size="24" />,
      disabled: true,
      key: '/disabled',
    },
  },
  {
    path: 'label',
    element: <div />,
    meta: {
      label: 'sys.menu.label',
      icon: <SvgIcon icon="ic_label" className="ant-menu-item-icon" size="24" />,
      suffix: (
        <ProTag color="cyan" icon={<Iconify icon="solar:bell-bing-bold-duotone" size={14} />}>
          NEW
        </ProTag>
      ),
      key: '/label',
    },
  },
  {
    path: 'frame',
    meta: {
      label: 'sys.menu.frame',
      icon: <SvgIcon icon="ic_external" className="ant-menu-item-icon" size="24" />,
      key: '/frame',
    },
    children: [
      {
        path: 'external_link',
        element: <ExternalLink to="https://ant.design/index-cn" />,
        meta: {
          label: 'sys.menu.external_link',
          key: '/frame/external_link',
        },
      },
      {
        path: 'iframe',
        element: <Iframe src="https://ant.design/index-cn" />,
        meta: {
          label: 'sys.menu.iframe',
          key: '/frame/iframe',
        },
      },
    ],
  },
  {
    path: 'blank',
    element: <Card />,
    meta: {
      label: 'sys.menu.blank',
      icon: <SvgIcon icon="ic_blank" className="ant-menu-item-icon" size="24" />,
      key: '/blank',
    },
  },
];

export default others;
