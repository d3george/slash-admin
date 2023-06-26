import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';

import Router from './router';
import { theme } from './theme/antd/theme';
import './theme/index.css';

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={theme}>
        <StyleProvider hashPriority="high">
          <div className="h-full w-full">
            <Router />
          </div>
        </StyleProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
