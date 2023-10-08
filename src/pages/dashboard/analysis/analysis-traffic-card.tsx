import { ReactNode } from 'react';

import { useThemeToken } from '@/theme/hooks';

type Props = {
  icon: ReactNode;
  title: string;
  subtitle: string;
};

export default function AnalysisTrafficCard({ icon, title, subtitle }: Props) {
  const theme = useThemeToken();
  return (
    <div
      className="flex flex-col items-center rounded py-5"
      style={{
        border: `1px solid ${theme.colorBorder}`,
      }}
    >
      <div>{icon}</div>
      <span className="text-2xl font-bold">{title}</span>
      <span className="text-sm" style={{ color: theme.colorTextSecondary }}>
        {subtitle}
      </span>
    </div>
  );
}
