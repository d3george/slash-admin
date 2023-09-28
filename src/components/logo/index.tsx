import { NavLink } from 'react-router-dom';

import { useThemeToken } from '@/theme/hooks';

function Logo({ className = '' }: { className?: string }) {
  const { colorPrimary } = useThemeToken();

  return (
    <NavLink to="/" className="no-underline">
      <h1 className={`font-semibold ${className} text-4xl`} style={{ color: colorPrimary }}>
        Logo
      </h1>
    </NavLink>
  );
}

export default Logo;
