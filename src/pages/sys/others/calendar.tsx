import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import FullCalendar from '@fullcalendar/react';

export default function Calendar() {
  return <FullCalendar plugins={[dayGridPlugin, interactionPlugin]} initialView="dayGridMonth" />;
}
