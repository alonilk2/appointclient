import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

export default function Schedule() {
  return (
    <div className="appoint-dashboard-container">
      <div className="form-container schedule-container">
        <h1 >לחץ\י על היום המתאים בלוח השנה...</h1>

        <div className="calendar">
          <FullCalendar
            plugins={[dayGridPlugin]}
            height="100%"
            initialView="dayGridMonth"
          />
        </div>
      </div>
    </div>
  );
}
