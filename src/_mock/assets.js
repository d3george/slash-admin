import { faker } from '@faker-js/faker';

import { PermissionType } from '#/enum';

/**
 * User data mock
 */
export const DEFAULT_USER = { username: 'demo@gmail.com', password: 'demo1234' };
export const USER_LIST = [DEFAULT_USER];

/**
 * Organization data mock
 */
export const ORG_LIST = [
  {
    id: '1',
    name: 'East China Branch',
    status: 'enable',
    desc: faker.lorem.words(),
    order: 1,
    children: [
      { id: '1-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
      { id: '1-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
      { id: '1-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
    ],
  },
  {
    id: '2',
    name: 'South China Branch',
    status: 'enable',
    desc: faker.lorem.words(),
    order: 2,
    children: [
      { id: '2-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
      { id: '2-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
      { id: '2-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
    ],
  },
  {
    id: '3',
    name: 'Northwest Branch',
    status: 'enable',
    desc: faker.lorem.words(),
    order: 3,
    children: [
      { id: '3-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
      { id: '3-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
      { id: '3-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
    ],
  },
];

/**
 * User permission mock
 */
export const PERMISSION_LIST = [
  {
    type: PermissionType.CATALOGUE,
    path: 'components',
    order: 3,
    meta: {
      label: 'sys.menu.components',
      icon: 'solar:widget-5-bold-duotone',
      key: '/components',
    },
    children: [
      {
        type: PermissionType.MENU,
        path: 'icon',
        component: 'components/icon',
        meta: { label: 'sys.menu.icon', key: '/components/icon' },
      },
      {
        type: PermissionType.MENU,
        path: 'animate',
        component: 'components/animate',
        meta: { label: 'sys.menu.animate', key: '/components/animate' },
      },
      {
        type: PermissionType.MENU,
        path: 'scroll',
        component: 'components/scroll',
        meta: { label: 'sys.menu.scroll', key: '/components/scroll' },
      },
      {
        type: PermissionType.MENU,
        path: 'markdown',
        component: 'components/markdown',
        meta: { label: 'sys.menu.markdown', key: '/components/markdown' },
      },
      {
        type: PermissionType.MENU,
        path: 'editor',
        component: 'components/editor',
        meta: { label: 'sys.menu.editor', key: '/components/editor' },
      },
      {
        type: PermissionType.MENU,
        path: 'i18n',
        component: 'components/multi-language',
        meta: { label: 'sys.menu.i18n', key: '/components/i18n' },
      },
      {
        type: PermissionType.MENU,
        path: 'upload',
        component: 'components/upload',
        meta: { label: 'sys.menu.upload', key: '/components/upload' },
      },
      {
        type: PermissionType.MENU,
        path: 'chart',
        component: 'components/chart',
        meta: { label: 'sys.menu.chart', key: '/components/chart' },
      },
    ],
  },
];
