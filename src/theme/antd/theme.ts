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

    // 线性化
    wireframe: false,

    borderRadiusSM: 2,
    borderRadius: 4,
    borderRadiusLG: 8,
  },
  components: {},
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
  dark: {
    colorBgLayout: '#161c24',
    colorBgContainer: '#212b36',
    colorBgElevated: '#161c24',
  },
  light: {},
};

export { customAntdTheme, colorPrimarys, baseColor };
