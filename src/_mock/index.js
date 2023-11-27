import { setupWorker } from 'msw';

import orgMockApi from './_org';
import userMockApi from './_user';

export const handlers = [...userMockApi, ...orgMockApi];
export const worker = setupWorker(...handlers);
