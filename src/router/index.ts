import { createBrowserRouter } from 'react-router-dom';

import { asyncRoutes } from './routes';

const router: any = createBrowserRouter(asyncRoutes);

export default router;
