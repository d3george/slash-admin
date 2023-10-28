import { faker } from '@faker-js/faker';

import { TaskPriority, TaskComment, TaskTag, DndDataType } from './types';

const fakeComment = (count: number): TaskComment[] => {
  const result = [];
  for (let index = 0; index < count; index += 1) {
    result.push({
      username: faker.person.fullName(),
      avatar: faker.image.avatarLegacy(),
      content: faker.lorem.lines({ min: 1, max: 3 }),
      time: faker.date.past(),
    });
  }
  return result;
};

const fakeAttachment = (count: number) => {
  const result = [];
  for (let index = 0; index < count; index += 1) {
    result.push(faker.image.urlPicsumPhotos());
  }
  return result;
};

const fakeAssignee = (count: number) => {
  const result = [];
  for (let index = 0; index < count; index += 1) {
    result.push(faker.image.avatarLegacy());
  }
  return result;
};

const fakeTag = (count: number) => {
  const uniqueArray = [];
  const set = new Set();

  while (uniqueArray.length < count) {
    const randomElement = faker.helpers.enumValue(TaskTag);
    if (!set.has(randomElement)) {
      uniqueArray.push(randomElement);
      set.add(randomElement);
    }
  }

  return uniqueArray;
};

export const initialData: DndDataType = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: faker.lorem.words(3),
      reporter: faker.image.avatarLegacy(),
      priority: TaskPriority.LOW,
      tags: [],
      comments: [],
      attachments: [],
    },
    'task-2': {
      id: 'task-2',
      title: faker.lorem.words(3),
      reporter: faker.image.avatarLegacy(),
      assignee: fakeAssignee(1),
      date: faker.date.future(),
      priority: TaskPriority.HIGH,
      tags: fakeTag(3),
      comments: fakeComment(1),
      attachments: fakeAttachment(4),
    },
    'task-3': {
      id: 'task-3',
      title: faker.lorem.words(4),
      reporter: faker.image.avatarLegacy(),
      assignee: fakeAssignee(2),
      priority: TaskPriority.MEDIUM,
      date: faker.date.future(),
      tags: fakeTag(2),
      comments: fakeComment(2),
      attachments: [],
    },
    'task-4': {
      id: 'task-4',
      title: faker.lorem.words(5),
      reporter: faker.image.avatar(),
      assignee: fakeAssignee(3),
      priority: TaskPriority.MEDIUM,
      tags: fakeTag(3),
      date: faker.date.future(),
      description: faker.lorem.lines(5),
      attachments: [],
      comments: fakeComment(3),
    },
    'task-5': {
      id: 'task-5',
      title: faker.lorem.words(4),
      reporter: faker.image.avatar(),
      priority: TaskPriority.HIGH,
      assignee: fakeAssignee(4),
      tags: fakeTag(4),
      date: faker.date.future(),
      description: faker.lorem.lines(3),
      attachments: [],
      comments: fakeComment(4),
    },
    'task-6': {
      id: 'task-6',
      title: faker.lorem.words(5),
      reporter: faker.image.avatar(),
      priority: TaskPriority.LOW,

      assignee: fakeAssignee(5),
      tags: fakeTag(5),
      date: faker.date.future(),
      description: faker.lorem.lines(4),
      attachments: fakeAttachment(5),
      comments: fakeComment(4),
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: ['task-4', 'task-5'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-6'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};
