import { CSSProperties } from 'react';

type Props = {
  cover: string;
  subtitle: string;
  title: string;
  style?: CSSProperties;
};
const coverUrl = (cover: string) => `src/assets/images/glass/${cover}`;

export default function AnalysisCard({ cover, subtitle, title, style }: Props) {
  return (
    <div
      className="flex flex-col items-center rounded-2xl py-10"
      style={{
        ...style,
      }}
    >
      <div>
        <img src={coverUrl(cover)} alt="" />
      </div>
      <span className="text-3xl font-bold">{title}</span>
      <span className="text-sm">{subtitle}</span>
    </div>
  );
}
