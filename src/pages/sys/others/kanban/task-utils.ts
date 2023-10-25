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
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};
