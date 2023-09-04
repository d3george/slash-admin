import { RouterProvider } from 'react-router-dom';

import router from '@/router';
import ThemeProvider from '@/theme';

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
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
