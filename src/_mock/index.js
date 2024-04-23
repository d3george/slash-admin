import { setupWorker } from 'msw/browser';

import orgMockApi from './handlers/_org';
import userMockApi from './handlers/_user';

const handlers = [...userMockApi, ...orgMockApi];
export const worker = setupWorker(...handlers);
