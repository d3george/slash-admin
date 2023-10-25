import { faker } from '@faker-js/faker';

import type { DndDataType } from './types';

export const initialData: DndDataType = {
  tasks: {
    'task-1': { id: 'task-1', content: faker.lorem.words(5) },
    'task-2': { id: 'task-2', content: faker.lorem.words(5) },
    'task-3': { id: 'task-3', content: faker.lorem.words(5) },
    'task-4': { id: 'task-4', content: faker.lorem.words(5) },
    'task-5': { id: 'task-5', content: faker.lorem.words(5) },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
    },
  },
  columnOrder: ['column-1'],
};
