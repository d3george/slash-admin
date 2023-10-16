import { App as AntdApp } from 'antd';
import { RouterProvider } from 'react-router-dom';

import router from '@/router';
import AntdConfig from '@/theme/antd';

import { MotionLazy } from './components/animate/motion-lazy';

function App() {
  return (
    <AntdConfig>
      <AntdApp>
        <MotionLazy>
          <RouterProvider router={router} />
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
  );
}

export default App;
