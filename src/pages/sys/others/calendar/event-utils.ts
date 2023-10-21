import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: `${todayStr}T12:00:00`,
  },
  { id: '1', title: 'event 1', date: '2023-10-01' },
  {
    title: 'event 2',
    start: '2023-10-01',
    end: '2023-10-05',
    allDay: true,
    HostName: 'William',
  },
  {
    title: 'event 3',
    start: '2023-10-05',
    end: '2023-10-07',
    allDay: true,
  },
  {
    title: 'event 4',
    start: '2023-10-05',
    end: '2023-10-07',
    allDay: true,
  },
  {
    title: 'event 5',
    start: '2023-10-05',
    end: '2023-10-07',
    allDay: true,
  },
  {
    title: 'event 6',
    start: '2023-10-05',
    end: '2023-10-07',
    allDay: true,
  },
];

export function createEventId() {
  // eslint-disable-next-line no-plusplus
  return String(eventGuid++);
}
