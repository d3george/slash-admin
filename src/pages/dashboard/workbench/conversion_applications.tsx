import { Progress } from 'antd';

import { Iconify } from '@/components/icon';
import { useThemeToken } from '@/theme/hooks';

export function Conversion() {
  const { colorPrimaryActive, colorPrimaryBorder } = useThemeToken();
  return (
    <Basic
      percent={48}
      title="38,566"
      subtitle="Conversion"
      iconify="tabler:user-filled"
      bg={colorPrimaryActive}
      strokeColor={colorPrimaryBorder}
    />
  );
}
export function Applications() {
  const { colorInfoActive, colorInfoBorder } = useThemeToken();
  return (
    <Basic
      percent={75}
      title="45,566"
      subtitle="Applications"
      iconify="ic:round-email"
      bg={colorInfoActive}
      strokeColor={colorInfoBorder}
    />
  );
}

type Props = {
  percent: number;
  title: string;
  subtitle: string;
  iconify: string;
  bg?: string;
  strokeColor?: string;
};
function Basic({ percent, title, subtitle, iconify, bg, strokeColor }: Props) {
  const { colorBgBase } = useThemeToken();
  const format = (val?: number) => <span style={{ color: colorBgBase }}>{val}%</span>;
  return (
    <div
      className="relative flex items-center rounded-2xl p-6"
      style={{ background: bg, color: colorBgBase }}
    >
      <Progress
        type="circle"
        size={70}
        percent={percent}
        format={format}
        strokeColor={strokeColor}
      />
      <div className="ml-2 flex flex-col">
        <span className="text-2xl font-bold">{title}</span>
        <span className="opacity-50">{subtitle}</span>
      </div>
      <div className="absolute right-0">
        <Iconify icon={iconify} style={{ opacity: 0.08 }} size={100} />
      </div>
    </div>
  );
}
