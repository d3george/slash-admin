import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';
import { RouterProvider } from 'react-router-dom';

import router from '@/router';

import { useSettings } from './store/settingStore';
import { colorPrimarys, customAntdTheme, baseColor } from './theme/antd/theme';

import { ThemeMode } from '#/enum';

function App() {
  const settings = useSettings();

  const { themeMode, themeColorPresets } = settings;
  const algorithm = themeMode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm;

  const colorPrimary = colorPrimarys[themeColorPresets];

  return (
    <ConfigProvider
      theme={{
        token: { ...customAntdTheme.token, colorPrimary, ...baseColor[themeMode] },
        components: { ...customAntdTheme.components },
        algorithm,
      }}
    >
      <StyleProvider hashPriority="high">
        <RouterProvider router={router} />
      </StyleProvider>
    </ConfigProvider>
  );
}

export default App;
