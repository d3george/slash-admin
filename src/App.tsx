import { App as AntdApp } from 'antd';

import Router from '@/router/index';
import { useColorScheme } from '@/store/settingStore';
import AntdConfig from '@/theme/antd';

import { MotionLazy } from './components/animate/motion-lazy';

function App() {
  useColorScheme();
  return (
    <AntdConfig>
      <AntdApp>
        <MotionLazy>
          <Router />
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
  );
}

export default App;
