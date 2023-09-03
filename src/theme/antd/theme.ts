import { ThemeConfig } from 'antd';

import { ThemeColorPresets } from '#/enum';
/**
 * Antd theme editor: https://ant.design/theme-editor-cn
 */
const customAntdTheme: ThemeConfig = {
  token: {
    colorSuccess: '#22c55e',
    colorWarning: '#ffab00',
    colorError: '#ff5630',
    colorInfo: '#00b8d9',
    colorInfoBg: '#CAFDF5',
    wireframe: false,
    borderRadius: 4,
  },
};

const colorPrimarys: {
  [k in ThemeColorPresets]: string;
} = {
  default: '#00a76f',
  cyan: '#078DEE',
  purple: '#7635DC',
  blue: '#2065D1',
  orange: '#FDA92D',
  red: '#FF3030',
};

const baseColor = {
  dark: {},
  light: {},
};

export { customAntdTheme, colorPrimarys, baseColor };
