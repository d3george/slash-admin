/**
 * https://styled-components.com/
 * vscode plugin: https://github.com/styled-components/vscode-styled-components
 */
import styled from "styled-components";

import { themeVars } from "@/theme/theme.css";

const StyledMarkdown = styled.div`
  display: grid;
  h1 {
    font-size: 64px;
    line-height: 1.25;
    font-weight: 800;
  }
  h2 {
    font-size: 56px;
    line-height: 1.25;
    font-weight: 700;
  }
  h3 {
    font-size: 48px;
    line-height: 1.25;
    font-weight: 700;
  }
  h4 {
    font-size: 40px;
    line-height: 1.25;
    font-weight: 700;
  }
  h5 {
    font-size: 32px;
    line-height: 1.25;
    font-weight: 700;
  }
  a {
    color: ${themeVars.colors.palette.primary.default};
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
    background-color: ${themeVars.colors.background.neutral};
    color: ${themeVars.colors.text.secondary};
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
    background-color: ${themeVars.colors.background.neutral};
  }

  // Table
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid ${themeVars.colors.common.border};
    th,
    td {
      padding: 8px;
      border: 1px solid ${themeVars.colors.common.border};
    }
    tbody tr:nth-of-type(odd) {
      background-color: ${themeVars.colors.background.neutral};
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
        background-color: ${themeVars.colors.palette.primary.default};
      }
      &:checked {
        &::before {
          background-color: ${themeVars.colors.palette.primary.default};
        }
        &::after {
          content: '';
          top: 1px;
          left: 5px;
          width: 4px;
          height: 9px;
          position: absolute;
          transform: rotate(45deg);
          border: solid ${themeVars.colors.common.white};
          border-width: 0 2px 2px 0;
        }
      }
    }
  }
`;

export default StyledMarkdown;
