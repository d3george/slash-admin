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

  // 使用 [...screenArray].reverse().find() 来代替 findLast 方法，避免兼容性问题
  // [...screenArray] 创建了一个 screenArray 的副本，这样 reverse 方法不会改变原数组的顺序
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
