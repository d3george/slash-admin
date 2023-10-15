import { Rate, RateProps } from 'antd';
import styled from 'styled-components';

import { Iconify } from '@/components/icon';

export default function ProRate(props: RateProps) {
  return (
    <StyledRate>
      <Rate character={<Iconify icon="solar:star-bold" size={18} />} {...props} />
    </StyledRate>
  );
}

const StyledRate = styled.div`
  .ant-rate {
    color: rgb(250, 175, 0);
    .ant-rate-star:not(:last-child) {
      margin-inline-end: 0;
    }
  }
`;
