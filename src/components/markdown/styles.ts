import { GlobalToken } from 'antd';
/**
 * https://styled-components.com/
 * vscode plugin: https://github.com/styled-components/vscode-styled-components
 */
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
const StyledMarkdown = styled.div<{ $token: GlobalToken; $thememode: ThemeMode }>`
  display: grid;
  // Text
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
  a {
    color: ${(props) => props.$token.colorPrimary};
  }
  img {
    border-radius: 4px;
  }
  br {
    display: grid;
    content: '';
    margin-top: 0.75em;
  }

  // Divider
  hr {
    margin: 0;
    border-width: 1;
    border-style: solid;
  }

  // List
  ul,
  ol {
    margin: 0;
    li {
      line-height: 2;
      display: flex;
      align-items: center;
    }
  }

  // Blockquote
  blockquote {
    line-height: 1.5;
    font-size: 1.5em;
    margin: 40px auto;
    position: relative;
    padding: 24px 24px 24px 64px;
    border-radius: 16px;
    background-color: #f4f6f8;
    color: #637381;
    p,
    span {
      margin-bottom: 0;
      font-size: inherit;
      font-family: inherit;
    }
    &::before {
      left: 16px;
      top: -8px;
      display: block;
      font-size: 3em;
      position: absolute;
      content: '“';
    }
  }

  // Code Block
  pre,
  pre > code {
    font-size: 16px;
    overflow-x: auto;
    white-space: pre;
    border-radius: 8px;
  }
  code {
    font-size: 14px;
    border-radius: 4px;
    white-space: pre;
    padding: 0px;
    background-color: ${(props) =>
      props.$thememode === ThemeMode.Light ? '#161c24' : '#919eab29'};
  }

  // Table
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #919eab33;
    th,
    td {
      padding: 8px;
      border: 1px solid #919eab33;
    }
    tbody tr:nth-of-type(odd) {
      background-color: ${(props) =>
        props.$thememode === ThemeMode.Light ? '#f4f6f8' : '#919eab1f '};
    }
  }

  // Checkbox
  input {
    margin-right: 10px;
    &[type='checkbox'] {
      position: relative;
      cursor: pointer;
      &::before {
        content: '';
        top: -2px;
        left: -2px;
        width: 17px;
        height: 17px;
        border-radius: 3px;
        position: absolute;
        background-color: #f4f6f8;
      }
      &:checked {
        &::before {
          background-color: ${(props) => props.$token.colorPrimary};
        }
        &::after {
          content: '';
          top: 1px;
          left: 5px;
          width: 4px;
          height: 9px;
          position: absolute;
          transform: rotate(45deg);
          border: solid white;
          border-width: 0 2px 2px 0;
        }
      }
    }
  }
`;

export default StyledMarkdown;
