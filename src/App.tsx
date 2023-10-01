import { App as AntdApp } from 'antd';
import { RouterProvider } from 'react-router-dom';

import router from '@/router';
import AntdConfig from '@/theme';

import { MotionLazy } from './components/animate/motion-lazy';

function App() {
  const charAt = `
    ███████╗██╗      █████╗ ███████╗██╗  ██╗     █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗
    ██╔════╝██║     ██╔══██╗██╔════╝██║  ██║    ██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║
    ███████╗██║     ███████║███████╗███████║    ███████║██║  ██║██╔████╔██║██║██╔██╗ ██║
    ╚════██║██║     ██╔══██║╚════██║██╔══██║    ██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║
    ███████║███████╗██║  ██║███████║██║  ██║    ██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║
    ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝
  `;
  console.info(`%c${charAt}`, 'color: #5BE49B');

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
