import { CSSProperties } from 'react';

type Props = {
  cover: string;
  subtitle: string;
  title: string;
  style?: CSSProperties;
};

export default function AnalysisCard({ cover, subtitle, title, style }: Props) {
  return (
    <div
      className="flex flex-col items-center rounded-2xl py-10"
      style={{
        ...style,
      }}
    >
      <img src={cover} alt="" />
      <span className="text-3xl font-bold">{title}</span>
      <span className="text-sm">{subtitle}</span>
    </div>
  );
}
