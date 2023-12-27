import styled from 'styled-components';

import { ThemeMode } from '#/enum';

export const StyledCalendar = styled.div<{ $themeMode: ThemeMode }>`
  width: 100%;
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none; /* 适用于Internet Explorer, Edge */
  scrollbar-width: none; /* 适用于Firefox */
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; /* 适用于Chrome、Safari和Opera */
  }
  .fc {
    width: 100%;
    height: 100%;
    /* override fullcalendar css variables */
    --fc-border-color: rgba(145, 158, 171, 0.16);
    --fc-now-indicator-color: #ff5630;
    --fc-today-bg-color: rgba(145, 158, 171, 0.08);
    --fc-page-bg-color: ${(props) =>
      props.$themeMode === ThemeMode.Light ? '#ffffff' : '#161c24'};
    --fc-neutral-bg-color: ${(props) =>
      props.$themeMode === ThemeMode.Light ? '#F4F6F8' : 'rgba(145, 158, 171, 0.12)'};
    --fc-list-event-hover-bg-color: rgba(145, 158, 171, 0.08);
    --fc-highlight-color: rgba(145, 158, 171, 0.08);

    a {
      color: ${(props) => (props.$themeMode === ThemeMode.Dark ? '#ffffff' : '#212b36')};
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

    /* view Month Week Day */
    .fc-dayGridMonth-view,
    .fc-timeGridWeek-view,
    .fc-timeGridDay-view {
      .fc-daygrid-day-number {
        line-height: 1.57143;
        font-size: 0.875rem;
        font-family: 'Public Sans', sans-serif;
        font-weight: 400;
        padding: 8px 8px 0px;
      }
      .fc-daygrid-event {
        margin-top: 4px;
        .fc-event-start,
        .fc-event-end {
          margin-left: 4px;
          margin-right: 4px;
        }
      }
      .fc-event {
        border-color: transparent !important;
        background-color: transparent !important;

        .fc-event-main-wrapper {
          border-radius: 6px;
          width: 100%;
          background-color: #fff;
          &::before {
            top: 0px;
            left: 0px;
            width: 100%;
            content: '';
            opacity: 0.24;
            height: 100%;
            border-radius: 6px;
            position: absolute;
            background-color: currentcolor;
            transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          }
          .fc-event-main-frame {
            font-size: 13px;
            line-height: 20px;
            filter: brightness(0.48);
            display: flex;
            width: 100%;
            .fc-event-time {
              overflow: unset;
              font-weight: 700;
            }
            .fc-event-title-container {
              flex-grow: 1;
              flex-shrink: 1;
              min-width: 0px;
              .fc-event-title {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }

    /* view list */
    .fc-list {
      .fc-list-day {
        th {
          z-index: 100;
        }
      }
      .fc-list-day-text,
      .fc-list-day-side-text {
        line-height: 1.57143;
        font-size: 0.875rem;
        font-family: 'Public Sans', sans-serif;
        font-weight: 400;
      }

      .fc-list-event-time {
        color: ${(props) =>
          props.$themeMode === ThemeMode.Light ? 'rgb(99, 115, 129)' : 'rgb(145, 158, 171)'};
      }
      .fc-event-title {
        color: ${(props) =>
          props.$themeMode === ThemeMode.Dark ? 'rgb(255, 255, 255)' : 'rgb(33, 43, 54)'};
      }
      .fc-list-table {
        th,
        td {
          border-color: transparent;
        }
      }

      .fc-event-main-frame {
        background-color: transparent;
      }
    }
  }
`;
