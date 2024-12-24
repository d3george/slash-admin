import { themeVars } from "@/theme/theme.css";
import styled from "styled-components";

const StyledEditor = styled.div`
  h1 {
    font-size: 64px;
    line-height: 1.25;
    font-weight: 800;
  }
  h2 {
    font-size: 56px;
    line-height: 1.25;
    font-weight: 800;
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
  h6 {
    font-size: 24px;
    line-height: 1.25;
    font-weight: 600;
  }
  img {
    display: inline;
  }
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  border: 1px solid ${themeVars.colors.common.border};
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
      color: ${themeVars.colors.text.secondary};
    }
    & pre.ql-syntax {
      border-radius: 8px;
      line-height: 1.57143;
      font-size: 0.875rem;
      font-family: 'Public Sans', sans-serif;
      font-weight: 400;
      padding: 16px;
      border-radius: 8px;
      background-color: ${themeVars.colors.background.neutral};
    }
  }
`;

const StyledToolbar = styled.div`
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
    fill: ${themeVars.colors.palette.primary.default};
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
    color: ${themeVars.colors.palette.primary.default};
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
    stroke: ${themeVars.colors.palette.primary.default};
  }

  & .ql-stroke {
    stroke: ${themeVars.colors.text.primary};
  }
  & .ql-fill,
  .ql-stroke.ql-fill {
    fill: ${themeVars.colors.text.primary};
  }

  & .ql-toolbar.ql-snow {
    border: none;
    border-bottom: 1px solid ${themeVars.colors.common.border};
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
      background-color: ${themeVars.colors.background.paper};
      color: ${themeVars.colors.text.primary};
    }
    & .ql-picker-options {
      margin-top: 4px;
      border: none;
      max-height: 200px;
      overflow: auto;
      border-radius: 8px;
      color: ${themeVars.colors.text.primary};
      background-color: ${themeVars.colors.background.paper};
    }
  }
`;
export { StyledEditor, StyledToolbar };
