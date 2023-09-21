import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';

import useLocale from '@/locales/useLocale';
import { useSettings } from '@/store/settingStore';

import { customAntdTheme, baseColor, colorPrimarys } from './antd/theme';

import { ThemeMode } from '#/enum';

type Props = {
  children: React.ReactNode;
};
export default function AntdConfig({ children }: Props) {
  const { themeMode, themeColorPresets } = useSettings();

  const { language } = useLocale();

  const algorithm = themeMode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm;
  const colorPrimary = colorPrimarys[themeColorPresets];

  return (
    <ConfigProvider
      locale={language.antdLocal}
      theme={{
        token: { ...customAntdTheme.token, colorPrimary, ...baseColor[themeMode] },
        components: { ...customAntdTheme.components },
        algorithm,
      }}
    >
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
}
