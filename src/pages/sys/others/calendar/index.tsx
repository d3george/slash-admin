import { DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // 提供 dayGridMonth, dayGridWeek, dayGridDay, dayGrid 视图
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // 如果需要 click select drag 这些action 则需要该依赖
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'; // 提供 timeGridWeek, timeGridDay, timeGrid 视图

import Card from '@/components/card';
import { useSettings } from '@/store/settingStore';

import CalendarHeader from './calendar-header';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { StyledCalendar } from './styles';

export default function Calendar() {
  const { themeMode } = useSettings();

  // click some day
  const handleDateClick = (dateClickInfo: DateClickArg) => {
    console.log('dateClick', dateClickInfo);
  };

  // select date range
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };
  return (
    <Card>
      <div className="h-full w-full">
        <StyledCalendar thmemode={themeMode}>
          <CalendarHeader />
          <FullCalendar
            headerToolbar={false}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            initialView="dayGridMonth"
            editable
            selectable
            selectMirror
            dayMaxEvents
            dateClick={handleDateClick}
            select={handleDateSelect}
          />
        </StyledCalendar>
      </div>
    </Card>
  );
}
