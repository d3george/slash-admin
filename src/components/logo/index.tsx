import { NavLink } from 'react-router-dom';

import { useThemeToken } from '@/theme/hooks';

import { Iconify } from '../icon';

interface Props {
  size?: number | string;
}
function Logo({ size = 50 }: Props) {
  const { colorPrimary } = useThemeToken();

  return (
    <NavLink to="/">
      <Iconify icon="solar:code-square-bold" color={colorPrimary} size={size} />
    </NavLink>
  );
}

export default Logo;
