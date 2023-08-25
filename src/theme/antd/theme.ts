import { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#00a76f',
    colorSuccess: '#22c55e',
    colorWarning: '#ffab00',
    colorError: '#ff5630',
    colorInfo: '#00b8d9',
    colorInfoBg: '#CAFDF5',
    wireframe: false,
    borderRadius: 4,
  },
  components: {
    Menu: {
      controlItemBgActive: 'rgba(0, 234, 112, 0.08)',
    },
  },
};

export { theme };
