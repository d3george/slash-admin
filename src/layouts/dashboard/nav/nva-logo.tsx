import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import Logo from '@/components/logo';
import { useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';
import { cn } from '@/utils';

import { HEADER_HEIGHT } from '../config';

import { ThemeLayout } from '#/enum';

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};
export default function NavLogo({ collapsed, onToggle }: Props) {
  const { themeLayout } = useSettings();
  const { colorPrimary, colorTextSecondary, colorBgContainer, colorBorderSecondary } =
    useThemeToken();
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
      <div
        onClick={onToggle}
        className={cn(
          'absolute right-0 top-7 z-50 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none items-center justify-center rounded-full text-center md:flex',
        )}
        style={{
          fontSize: 16,
          border: `1px solid ${colorBorderSecondary}`,
          backgroundColor: colorBgContainer,
        }}
      >
        {collapsed ? (
          <RightOutlined style={{ fontSize: 12, color: colorTextSecondary }} />
        ) : (
          <LeftOutlined style={{ fontSize: 12, color: colorTextSecondary }} />
        )}
      </div>
    </div>
  );
}
