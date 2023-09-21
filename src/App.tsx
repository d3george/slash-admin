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
      <MotionLazy>
        <RouterProvider router={router} />
      </MotionLazy>
    </AntdConfig>
  );
}

export default App;
