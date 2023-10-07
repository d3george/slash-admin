import { setupWorker } from 'msw';

import userMockApi from './_user';

export const handlers = [...userMockApi];
export const worker = setupWorker(...handlers);
