import { GlobalToken } from 'antd';
import styled from 'styled-components';

import { ThemeMode } from '#/enum';

type KeyofToken = keyof GlobalToken;
const getHeadingStyle = (level: 1 | 2 | 3 | 4 | 5, token: GlobalToken) => {
  const fontSizeHeading: KeyofToken = `fontSizeHeading${level}`;
  const lineHeightHeading: KeyofToken = `lineHeightHeading${level}`;

  return {
    margin: 0,
    color: token.colorTextHeading,
    fontWeight: 800,
    fontSize: token[fontSizeHeading],
    lineHeight: token[lineHeightHeading],
  };
};

const StyledEditor = styled.div<{ $token: GlobalToken; $thememode: ThemeMode }>`
  h1 {
    ${(props) => getHeadingStyle(1, props.$token)};
  }
  h2 {
    ${(props) => getHeadingStyle(2, props.$token)};
  }
  h3 {
    ${(props) => getHeadingStyle(3, props.$token)};
  }
  h4 {
    ${(props) => getHeadingStyle(4, props.$token)};
  }
  h5 {
    ${(props) => getHeadingStyle(5, props.$token)};
  }
  img {
    display: inline;
  }
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  border: 1px solid rgba(119, 145, 170, 0.2);
  & .ql-container.ql-snow {
    border: none;
    line-height: 1.6;
    font-weight: 400;
    font-size: 0.875rem;
  }
  & .ql-editor {
    min-height: 160px;
    max-height: 640px;
    background-color: rgba(145, 158, 171, 0.08);
    &.ql-blank::before {
      font-style: normal;
      color: rgb(145, 158, 171);
    }
    & pre.ql-syntax {
      border-radius: 8px;
      line-height: 1.57143;
      font-size: 0.875rem;
      font-family: 'Public Sans', sans-serif;
      font-weight: 400;
      padding: 16px;
      border-radius: 8px;
      background-color: rgb(22, 28, 36);
    }
  }
`;

const StyledToolbar = styled.div<{ $token: GlobalToken; $thememode: ThemeMode }>`
  & .ql-snow.ql-toolbar button:hover .ql-fill,
  .ql-snow .ql-toolbar button:hover .ql-fill,
  .ql-snow.ql-toolbar button:focus .ql-fill,
  .ql-snow .ql-toolbar button:focus .ql-fill,
  .ql-snow.ql-toolbar button.ql-active .ql-fill,
  .ql-snow .ql-toolbar button.ql-active .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
  .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
    fill: ${(props) => props.$token.colorPrimary};
  }
  & .ql-snow.ql-toolbar button:hover,
  .ql-snow .ql-toolbar button:hover,
  .ql-snow.ql-toolbar button:focus,
  .ql-snow .ql-toolbar button:focus,
  .ql-snow.ql-toolbar button.ql-active,
  .ql-snow .ql-toolbar button.ql-active,
  .ql-snow.ql-toolbar .ql-picker-label:hover,
  .ql-snow .ql-toolbar .ql-picker-label:hover,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active,
  .ql-snow.ql-toolbar .ql-picker-item:hover,
  .ql-snow .ql-toolbar .ql-picker-item:hover,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
    color: ${(props) => props.$token.colorPrimary};
  }

  & .ql-snow.ql-toolbar button:hover .ql-stroke,
  .ql-snow .ql-toolbar button:hover .ql-stroke,
  .ql-snow.ql-toolbar button:focus .ql-stroke,
  .ql-snow .ql-toolbar button:focus .ql-stroke,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke,
  .ql-snow .ql-toolbar button.ql-active .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
  .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
  .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
  .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
  .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
    stroke: ${(props) => props.$token.colorPrimary};
  }

  & .ql-stroke {
    stroke: ${(props) => props.$token.colorTextBase};
  }
  & .ql-fill,
  .ql-stroke.ql-fill {
    fill: ${(props) => props.$token.colorTextBase};
  }

  & .ql-toolbar.ql-snow {
    border: none;
    border-bottom: 1px solid rgba(119, 145, 170, 0.2);
    // Button
    & button {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    }
    & button svg,
    span svg {
      width: 20px;
      height: 20px;
    }
    & .ql-picker-label {
      border-radius: 4px;
      border-color: transparent !important;
      background-color: ${(props) => props.$token.colorBgContainerDisabled};
      color: ${(props) => props.$token.colorTextBase};
    }
    & .ql-picker-options {
      margin-top: 4px;
      border: none;
      max-height: 200px;
      overflow: auto;
      border-radius: 8px;
      color: ${(props) => props.$token.colorTextBase};
      background-color: ${(props) => props.$token.colorBgContainer};
    }
  }
`;
export { StyledEditor, StyledToolbar };
