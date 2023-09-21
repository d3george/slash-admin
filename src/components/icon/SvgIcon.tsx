import { CSSProperties } from 'react';

interface SvgIconProps {
  prefix?: string;
  icon: string;
  color?: string;
  size?: string;
  className?: string;
}
function SvgIcon({
  prefix = 'icon',
  icon,
  color = 'currentColor',
  size = '1em',
  className = '',
}: SvgIconProps) {
  const symbolId = `#${prefix}-${icon}`;
  const svgStyle: CSSProperties = {
    verticalAlign: 'middle',
    width: size,
    height: size,
    color,
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={`fill-current inline-block h-[1em] w-[1em] overflow-hidden outline-none ${className}`}
      style={svgStyle}
    >
      <use xlinkHref={symbolId} fill="currentColor" />
    </svg>
  );
}

export default SvgIcon;
