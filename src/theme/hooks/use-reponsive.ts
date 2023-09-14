import { Grid, theme } from 'antd';
import { Breakpoint, ScreenMap, ScreenSizeMap } from 'antd/es/_util/responsiveObserver';

export default function useReponsive() {
  const { useBreakpoint } = Grid;
  const {
    token: { screenXS, screenSM, screenMD, screenLG, screenXL, screenXXL },
  } = theme.useToken();
  const screenArray: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

  const screenEnum: ScreenSizeMap = {
    xs: screenXS,
    sm: screenSM,
    md: screenMD,
    lg: screenLG,
    xl: screenXL,
    xxl: screenXXL,
  };
  const screens: ScreenMap = useBreakpoint();

  const currentScrren = screenArray.findLast((item) => {
    const result = screens[item];
    return result === true;
  });

  return {
    screenEnum,
    screens,
    currentScrren,
  };
}
