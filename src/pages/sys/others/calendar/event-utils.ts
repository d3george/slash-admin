import { faker } from '@faker-js/faker';
import { EventInput } from '@fullcalendar/core';

const todayStr = new Date();
type ColorSet =
  | '#00a76f'
  | '#8e33ff'
  | '#00b8d9'
  | '#003768'
  | '#22c55e'
  | '#ffab00'
  | '#ff5630'
  | '#7a0916';

export const INITIAL_EVENTS: EventInput[] = [
  {
    title: faker.lorem.text(),
    start: todayStr,
    color: '#7a0916',
  },
  {
    title: faker.lorem.text(),
    start: '2023-10-22',
    end: '2023-10-25',
    allDay: true,
    color: '#00b8d9',
  },
  {
    title: faker.lorem.text(),
    start: '2023-10-25',
    end: '2023-10-27',
    allDay: true,
    color: '#ff5630',
  },
  {
    title: faker.lorem.text(),
    start: '2023-10-27',
    end: '2023-10-28',
    allDay: true,
    color: '#ffab00',
  },
  {
    title: faker.lorem.text(),
    start: '2023-10-28',
    end: '2023-10-29',
    allDay: true,
    color: '#8e33ff',
  },
  {
    title: faker.lorem.text(),
    start: '2023-10-19',
    end: '2023-10-22',
    color: '#00a76f',
  },
];
