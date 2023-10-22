import { faker } from '@faker-js/faker';
import { EventInput } from '@fullcalendar/core';
import dayjs from 'dayjs';

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    start: dayjs().toISOString(),
    end: dayjs().add(10, 'hour').toISOString(),
    color: '#7a0916',
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    start: dayjs().add(1, 'day').toISOString(),
    end: dayjs().add(3, 'day').toISOString(),
    allDay: faker.datatype.boolean(),
    color: '#00b8d9',
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    start: dayjs().add(3, 'day').toISOString(),
    end: dayjs().add(5, 'day').toISOString(),
    allDay: faker.datatype.boolean(),
    color: '#ff5630',
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    start: dayjs().add(7, 'day').toISOString(),
    end: dayjs().add(8, 'day').toISOString(),
    allDay: faker.datatype.boolean(),
    color: '#ffab00',
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    start: dayjs().add(7, 'day').toISOString(),
    end: dayjs().add(8, 'day').toISOString(),
    allDay: faker.datatype.boolean(),
    color: '#ffab00',
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    start: dayjs().add(8, 'day').toISOString(),
    end: dayjs().add(9, 'day').toISOString(),
    allDay: faker.datatype.boolean(),
    color: '#8e33ff',
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    start: dayjs().add(10, 'day').toISOString(),
    end: dayjs().add(11, 'day').toISOString(),
    color: '#00a76f',
  },
];
