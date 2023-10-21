import styled from 'styled-components';

import { ThemeMode } from '#/enum';

export const StyledCalendar = styled.div<{ thmemode: ThemeMode }>`
  .fc {
    --fc-border-color: rgba(145, 158, 171, 0.16);
    --fc-now-indicator-color: #ff5630;
    --fc-today-bg-color: rgba(145, 158, 171, 0.08);
    --fc-page-bg-color: ${(props) => (props.thmemode === ThemeMode.Light ? '#ffffff' : '#161c24')};
    --fc-neutral-bg-color: ${(props) =>
      props.thmemode === ThemeMode.Light ? '#F4F6F8' : 'rgba(145, 158, 171, 0.12)'};
    --fc-list-event-hover-bg-color: rgba(145, 158, 171, 0.08);
    --fc-highlight-color: rgba(145, 158, 171, 0.08);
    a {
      color: ${(props) => (props.thmemode === ThemeMode.Dark ? '#ffffff' : '#212b36')};
    }
    .fc-col-header {
      box-shadow: rgba(145, 158, 171, 0.2) 0px -1px 0px inset;
      th {
        border-color: transparent;
      }
      .fc-col-header-cell-cushion {
        font-weight: 600;
        font-size: 0.875rem;
        font-family: 'Public Sans', sans-serif;
        padding: 8px 0px;
      }
    }
  }
`;
