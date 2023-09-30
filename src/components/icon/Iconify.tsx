import { Icon } from '@iconify/react';
import { styled } from 'styled-components';

import type { IconProps } from '@iconify/react';

interface Props extends IconProps {
  size?: IconProps['width'];
}
export function Iconify({ icon, size = '1em', ...other }: Props) {
  return (
    <StyledIconify className="anticon">
      <Icon icon={icon} width={size} height={size} {...other} />
    </StyledIconify>
  );
}

const StyledIconify = styled.span`
  svg {
    display: inline-block;
  }
`;
