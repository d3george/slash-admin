import { Suspense, lazy } from 'react';

import Card from '@/components/card';
import { Iconify, SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import ProTag from '@/theme/antd/components/tag';

import { AppRouteObject } from '#/router';

const ExternalLink = lazy(() => import('@/pages/sys/others/iframe/external-link'));
const Iframe = lazy(() => import('@/pages/sys/others/iframe'));
const Calendar = lazy(() => import('@/pages/sys/others/calendar'));
const Kanban = lazy(() => import('@/pages/sys/others/kanban'));

function Wrapper({ children }: any) {
  return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}
const others: AppRouteObject[] = [
  {
    path: 'calendar',
    element: (
      <Wrapper>
        <Calendar />
      </Wrapper>
    ),
    meta: {
      label: 'sys.menu.calendar',
      icon: <Iconify icon="solar:calendar-bold-duotone" size={24} />,
      key: '/calendar',
    },
  },
  {
    path: 'kanban',
    element: (
      <Wrapper>
        <Kanban />
      </Wrapper>
    ),
    meta: {
      label: 'sys.menu.kanban',
      icon: <Iconify icon="solar:clipboard-bold-duotone" size={24} />,
      key: '/kanban',
    },
  },
  {
    element: (
      <Wrapper>
        <div />
      </Wrapper>
    ),
    meta: {
      label: 'sys.menu.disabled',
      icon: <SvgIcon icon="ic_disabled" className="ant-menu-item-icon" size="24" />,
      disabled: true,
      key: '/disabled',
    },
  },
  {
    path: 'label',
    element: (
      <Wrapper>
        <div />
      </Wrapper>
    ),
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
        element: (
          <Wrapper>
            <ExternalLink src="https://ant.design/index-cn" />
          </Wrapper>
        ),
        meta: {
          label: 'sys.menu.external_link',
          key: '/frame/external_link',
        },
      },
      {
        path: 'iframe',
        element: (
          <Wrapper>
            <Iframe src="https://ant.design/index-cn" />
          </Wrapper>
        ),
        meta: {
          label: 'sys.menu.iframe',
          key: '/frame/iframe',
        },
      },
    ],
  },
  {
    path: 'blank',
    element: (
      <Wrapper>
        <Card />
      </Wrapper>
    ),
    meta: {
      label: 'sys.menu.blank',
      icon: <SvgIcon icon="ic_blank" className="ant-menu-item-icon" size="24" />,
      key: '/blank',
    },
  },
];

export default others;
