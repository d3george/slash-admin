import { useSettings } from '@/store/settingStore';

import NavHorizontal from './nav-horizontal';
import NavVertical from './nav-vertical';

import { ThemeLayout } from '#/enum';

export default function Nav() {
  const { themeLayout } = useSettings();
  return themeLayout === ThemeLayout.Horizontal ? <NavHorizontal /> : <NavVertical />;
}
