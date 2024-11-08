import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect, useCallback } from 'react';

import { usePathname } from '@/router/hooks';
import { useThemeToken } from '@/theme/hooks';

// 配置 NProgress
NProgress.configure({
  showSpinner: false,
});

export default function ProgressBar() {
  const pathname = usePathname();
  const { colorPrimary } = useThemeToken();

  const updateProgressBarStyle = useCallback(() => {
    const nprogress = document.getElementById('nprogress');
    if (!nprogress) return;

    const bar = nprogress.querySelector<HTMLElement>('.bar');
    const peg = nprogress.querySelector<HTMLElement>('.peg');

    if (!bar || !peg) return;

    bar.style.background = colorPrimary;
    bar.style.boxShadow = `0 0 2px ${colorPrimary}`;
    peg.style.boxShadow = `0 0 10px ${colorPrimary}, 0 0 5px ${colorPrimary}`;
  }, [colorPrimary]);

  useEffect(() => {
    NProgress.start();
    updateProgressBarStyle();

    // 路由变化完成时
    const timer = setTimeout(() => {
      NProgress.done();
    }, 100);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, updateProgressBarStyle]);

  return null;
}
