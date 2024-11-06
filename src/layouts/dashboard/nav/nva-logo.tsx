import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import Logo from '@/components/logo';
import { useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';

import { HEADER_HEIGHT } from '../config';

import { ThemeLayout } from '#/enum';

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};
export default function NavLogo({ collapsed, onToggle }: Props) {
  const { themeLayout } = useSettings();
  const { colorPrimary, colorTextBase } = useThemeToken();
  return (
    <div
      style={{ height: `${HEADER_HEIGHT}px` }}
      className="relative flex items-center justify-center py-4"
    >
      <div className="flex items-center">
        <Logo />
        {themeLayout !== ThemeLayout.Mini && (
          <span className="ml-2 text-xl font-bold" style={{ color: colorPrimary }}>
            Slash Admin
          </span>
        )}
      </div>
      <button
        onClick={onToggle}
        className="absolute right-0 top-7 z-50 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none rounded-full text-center !text-gray md:block"
        style={{ color: colorTextBase, borderColor: colorTextBase, fontSize: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined size={20} /> : <MenuFoldOutlined size={20} />}
      </button>
    </div>
  );
}
