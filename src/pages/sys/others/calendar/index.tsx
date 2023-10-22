import { faker } from '@faker-js/faker';
import { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core';
//  fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // 提供 dayGridMonth, dayGridWeek, dayGridDay, dayGrid 视图
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // 如果需要 click select drag 这些action 则需要该依赖
import listPlugin from '@fullcalendar/list'; // 提供 listWeek view
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'; // 提供 timeGridWeek, timeGridDay, timeGrid 视图
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

import Card from '@/components/card';
import { useSettings } from '@/store/settingStore';

import CalendarEvent from './calendar-event';
import CalendarEventForm, { CalendarEventFormFieldType } from './calendar-event-form';
import CalendarHeader, { HandleMoveArg, ViewType } from './calendar-header';
import { INITIAL_EVENTS } from './event-utils';
import { StyledCalendar } from './styles';

const DefaultEventInitValue = {
  id: faker.string.uuid(),
  title: '',
  description: '',
  allDay: false,
  start: dayjs(),
  end: dayjs(),
  color: '',
};
export default function Calendar() {
  const fullCalendarRef = useRef<FullCalendar>(null);
  const [view, setView] = useState<ViewType>('dayGridMonth');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [eventInitValue, setEventInitValue] =
    useState<CalendarEventFormFieldType>(DefaultEventInitValue);
  const [eventFormType, setEventFormType] = useState<'add' | 'edit'>('add');

  const { themeMode } = useSettings();

  /**
   * calendar header events
   */
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

  /**
   * calendar grid events
   */
  // click some day
  const handleDateClick = (dateClickInfo: DateClickArg) => {
    console.log('dateClick', dateClickInfo);
  };
  // select date range
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    setOpen(true);
    setEventFormType('add');
    setEventInitValue({
      id: faker.string.uuid(),
      title: '',
      description: '',
      start: dayjs(selectInfo.startStr),
      end: dayjs(selectInfo.endStr),
      allDay: selectInfo.allDay,
    });
  };

  /**
   * calendar event events
   */
  // event click
  const handleEventClick = (arg: EventClickArg) => {
    const { title, extendedProps, allDay, start, end, backgroundColor, id } = arg.event;
    setOpen(true);
    setEventFormType('edit');
    const newEventValue: CalendarEventFormFieldType = {
      id,
      title,
      allDay,
      start: dayjs(start),
      end: dayjs(end),
      color: backgroundColor,
      description: extendedProps.description,
    };
    console.log('newEventValue', newEventValue);
    setEventInitValue(newEventValue);
  };
  const handleCancel = () => {
    setEventInitValue(DefaultEventInitValue);
    setOpen(false);
  };

  const handleEdit = (values: CalendarEventFormFieldType) => {
    const { id, title = '', description, start, end, allDay = false, color } = values;
    const calendarApi = fullCalendarRef.current!.getApi();
    const oldEvent = calendarApi.getEventById(id);

    const newEvent: EventInput = {
      id,
      title,
      allDay,
      color,
      extendedProps: {
        description,
      },
    };
    if (start) newEvent.start = start.toDate();
    if (end) newEvent.end = end.toDate();

    console.log('editEvent', id, oldEvent, newEvent);
    // 刷新日历显示
    oldEvent?.remove();
    calendarApi.addEvent(newEvent);
  };

  const handleCreate = (values: CalendarEventFormFieldType) => {
    const calendarApi = fullCalendarRef.current!.getApi();
    const { title = '', description, start, end, allDay = false, color } = values;

    const newEvent: EventInput = {
      id: faker.string.uuid(),
      title,
      allDay,
      color,
      extendedProps: {
        description,
      },
    };
    if (start) newEvent.start = start.toDate();
    if (end) newEvent.end = end.toDate();

    console.log('createEvent', newEvent);
    // 刷新日历显示
    calendarApi.addEvent(newEvent);
  };

  const handleDelete = (id: string) => {
    const calendarApi = fullCalendarRef.current!.getApi();
    const oldEvent = calendarApi.getEventById(id);
    oldEvent?.remove();
  };
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
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialDate={date}
            initialView={view}
            events={INITIAL_EVENTS}
            eventContent={CalendarEvent}
            editable
            selectable
            selectMirror
            dayMaxEvents
            headerToolbar={false}
            dateClick={handleDateClick}
            select={handleDateSelect}
            eventClick={handleEventClick}
          />
        </StyledCalendar>
      </div>
      <CalendarEventForm
        open={open}
        type={eventFormType}
        initValues={eventInitValue}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onEdit={handleEdit}
      />
    </Card>
  );
}
