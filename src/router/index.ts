import { createHashRouter } from 'react-router-dom';

import { asyncRoutes } from './routes';

const router: any = createHashRouter(asyncRoutes);

export default router;
