import { setupWorker } from "msw/browser";

import demoMockApi from "./handlers/_demo";
import menuMockApi from "./handlers/_menu";
import userMockApi from "./handlers/_user";

const handlers = [...userMockApi, ...demoMockApi, ...menuMockApi];
const worker = setupWorker(...handlers);

export default worker;
