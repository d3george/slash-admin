import { Tag, TagProps } from 'antd';
import styled from 'styled-components';

export default function ProTag(props: TagProps) {
  return (
    <StyledTag>
      <Tag {...props} />
    </StyledTag>
  );
}

const StyledTag = styled.div`
  display: inline-flex;
  .ant-tag {
    border-radius: 6px;
    cursor: default;
    height: 24px;
    min-width: 24px;
    padding: 0 6px;
    margin: 0 6px;
    font-size: 0.75rem;
    font-weight: 700;
    border-width: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    text-transform: capitalize;
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;
