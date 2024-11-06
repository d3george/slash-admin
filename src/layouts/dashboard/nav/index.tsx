import { useSettings } from '@/store/settingStore';
import { useResponsive } from '@/theme/hooks';

import NavHorizontal from './nav-horizontal';
import NavVertical from './nav-vertical';

import { ThemeLayout } from '#/enum';

export default function Nav() {
  const { themeLayout } = useSettings();
  const { screenMap } = useResponsive();

  if (themeLayout === ThemeLayout.Horizontal) return <NavHorizontal />;

  if (screenMap.md) return <NavVertical />;
  return null;
}
