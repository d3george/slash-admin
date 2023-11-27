import { faker } from '@faker-js/faker';

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
