import { Grid, theme } from 'antd';
import { Breakpoint, ScreenMap, ScreenSizeMap } from 'antd/es/_util/responsiveObserver';

const { useBreakpoint } = Grid;

export function useResponsive() {
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
  const screenMap: ScreenMap = useBreakpoint();

  const currentScrren = [...screenArray].reverse().find((item) => {
    const result = screenMap[item];
    return result === true;
  });
  return {
    screenEnum,
    screenMap,
    currentScrren,
  };
}
