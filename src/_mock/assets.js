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
const DASHBOARD_PERMISSION = {
  id: '9100714781927703',
  parentId: '',
  label: 'sys.menu.dashboard',
  name: 'Dashboard',
  icon: 'ic-analysis',
  type: PermissionType.CATALOGUE,
  route: 'dashboard',
  order: 1,
  children: [
    {
      id: '8426999229400979',
      parentId: '9100714781927703',
      label: 'sys.menu.workbench',
      name: 'Workbench',
      type: PermissionType.MENU,
      route: 'workbench',
      component: '/dashboard/workbench',
    },
    {
      id: '9710971640510357',
      parentId: '9100714781927703',
      label: 'sys.menu.analysis',
      name: 'Analysis',
      type: PermissionType.MENU,
      route: 'analysis',
      component: '/dashboard/analysis',
    },
  ],
};
const COMPONENTS_PERMISSION = {
  id: '2271615060673773',
  parentId: '',
  label: 'sys.menu.components',
  name: 'Components',
  icon: 'solar:widget-5-bold-duotone',
  type: PermissionType.CATALOGUE,
  route: 'components',
  order: 3,
  children: [
    {
      id: '2478488238255411',
      parentId: '2271615060673773',
      label: 'sys.menu.icon',
      name: 'Icon',
      type: PermissionType.MENU,
      route: 'icon',
      component: '/components/icon',
    },
    {
      id: '6755238352318767',
      parentId: '2271615060673773',
      label: 'sys.menu.animate',
      name: 'Animate',
      type: PermissionType.MENU,
      route: 'animate',
      component: '/components/animate',
    },
    {
      id: '9992476513546805',
      parentId: '2271615060673773',
      label: 'sys.menu.scroll',
      name: 'Scroll',
      type: PermissionType.MENU,
      route: 'scroll',
      component: '/components/scroll',
    },
    {
      id: '1755562695856395',
      parentId: '2271615060673773',
      label: 'sys.menu.markdown',
      name: 'Markdown',
      type: PermissionType.MENU,
      route: 'markdown',
      component: '/components/markdown',
    },
    {
      id: '2122547769468069',
      parentId: '2271615060673773',
      label: 'sys.menu.editor',
      name: 'Editor',
      type: PermissionType.MENU,
      route: 'editor',
      component: '/components/editor',
    },
    {
      id: '2501920741714350',
      parentId: '2271615060673773',
      label: 'sys.menu.i18n',
      name: 'Multi Language',
      type: PermissionType.MENU,
      route: 'i18n',
      component: '/components/multi-language',
    },
    {
      id: '2013577074467956',
      parentId: '2271615060673773',
      label: 'sys.menu.upload',
      name: 'upload',
      type: PermissionType.MENU,
      route: 'Upload',
      component: '/components/upload',
    },
    {
      id: '7749726274771764',
      parentId: '2271615060673773',
      label: 'sys.menu.chart',
      name: 'Chart',
      type: PermissionType.MENU,
      route: 'chart',
      component: '/components/chart',
    },
  ],
};
const FUNCTIONS_PERMISSION = {
  id: '8132044808088488',
  parentId: '',
  label: 'sys.menu.functions',
  name: 'functions',
  icon: 'solar:plain-2-bold-duotone',
  type: PermissionType.CATALOGUE,
  route: 'functions',
  order: 4,
  children: [
    {
      id: '3667930780705750',
      parentId: '8132044808088488',
      label: 'sys.menu.clipboard',
      name: 'Clipboard',
      type: PermissionType.MENU,
      route: 'clipboard',
      component: '/functions/clipboard',
    },
  ],
};
const MENU_LEVEL_PERMISSION = {
  id: '0194818428516575',
  parentId: '',
  label: 'sys.menu.menulevel.index',
  name: 'Menu Level',
  icon: 'ic-menulevel',
  type: PermissionType.CATALOGUE,
  route: 'menu-level',
  order: 5,
  children: [
    {
      id: '0144431332471389',
      parentId: '0194818428516575',
      label: 'sys.menu.menulevel.1a',
      name: 'Menu Level 1a',
      type: PermissionType.MENU,
      route: 'menu-level-1a',
      component: '/menu-level/menu-level-1a',
    },
    {
      id: '7572529636800586',
      parentId: '0194818428516575',
      label: 'sys.menu.menulevel.1b.index',
      name: 'Menu Level 1b',
      type: PermissionType.CATALOGUE,
      route: 'menu-level-1b',
      children: [
        {
          id: '3653745576583237',
          parentId: '7572529636800586',
          label: 'sys.menu.menulevel.1b.2a',
          name: 'Menu Level 2a',
          type: PermissionType.MENU,
          route: 'menu-level-2a',
          component: '/menu-level/menu-level-1b/menu-level-2a',
        },
        {
          id: '4873136353891364',
          parentId: '7572529636800586',
          label: 'sys.menu.menulevel.1b.2b.index',
          name: 'Menu Level 2b',
          type: PermissionType.CATALOGUE,
          route: 'menu-level-2b',
          children: [
            {
              id: '4233029726998055',
              parentId: '4873136353891364',
              label: 'sys.menu.menulevel.1b.2b.3a',
              name: 'Menu Level 3a',
              type: PermissionType.MENU,
              route: 'menu-level-3a',
              component: '/menu-level/menu-level-1b/menu-level-2b/menu-level-3a',
            },
            {
              id: '3298034742548454',
              parentId: '4873136353891364',
              label: 'sys.menu.menulevel.1b.2b.3b',
              name: 'Menu Level 3b',
              type: PermissionType.MENU,
              route: 'menu-level-3b',
              component: '/menu-level/menu-level-1b/menu-level-2b/menu-level-3b',
            },
          ],
        },
      ],
    },
  ],
};

export const PERMISSION_LIST = [
  DASHBOARD_PERMISSION,
  COMPONENTS_PERMISSION,
  FUNCTIONS_PERMISSION,
  MENU_LEVEL_PERMISSION,
];
