import { DateSelectArg } from '@fullcalendar/core';
//  fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // 提供 dayGridMonth, dayGridWeek, dayGridDay, dayGrid 视图
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // 如果需要 click select drag 这些action 则需要该依赖
import listPlugin from '@fullcalendar/list'; // 提供 listWeek view
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'; // 提供 timeGridWeek, timeGridDay, timeGrid 视图
import { useRef, useState } from 'react';

import Card from '@/components/card';
import { useSettings } from '@/store/settingStore';

import CalendarEvent from './calendar-event';
import CalendarHeader, { HandleMoveArg, ViewType } from './calendar-header';
import { INITIAL_EVENTS } from './event-utils';
import { StyledCalendar } from './styles';

export default function Calendar() {
  const fullCalendarRef = useRef<FullCalendar>(null);
  const [view, setView] = useState<ViewType>('timeGridWeek');

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
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleMove = (action: HandleMoveArg) => {
    const calendarApi = fullCalendarRef.current!.getApi();
    console.log('date', calendarApi.getDate());
    switch (action) {
      case 'prev':
        calendarApi.prev();
        break;
      case 'next':
        calendarApi.next();
        break;
      case 'today':
        calendarApi.today();
        break;
      default:
        break;
    }
    setDate(calendarApi.getDate());
  };

  const handleViewTypeChange = (view: ViewType) => {
    const calendarApi = fullCalendarRef.current!.getApi();
    calendarApi.changeView(view);
    setView(view);
  };

  const [date, setDate] = useState(new Date());

  return (
    <Card>
      <div className="h-full w-full">
        <StyledCalendar $themeMode={themeMode}>
          <CalendarHeader
            now={date}
            view={view}
            onMove={handleMove}
            onViewTypeChange={handleViewTypeChange}
          />
          <FullCalendar
            ref={fullCalendarRef}
            headerToolbar={false}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            events={INITIAL_EVENTS}
            eventContent={CalendarEvent}
            initialView={view}
            editable
            selectable
            selectMirror
            dayMaxEvents
            dateClick={handleDateClick}
            select={handleDateSelect}
            initialDate={date}
          />
        </StyledCalendar>
      </div>
    </Card>
  );
}
