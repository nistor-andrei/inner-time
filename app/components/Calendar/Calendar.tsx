"use client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

interface StyledCalendarProps {
  appointments: string[];
}

const StyledCalendar = ({ appointments }: StyledCalendarProps) => {
  const appointmentDates = appointments.map((app) => {
    const [day, month, year] = app.split("/");
    return `${day}/${month}/${year}`;
  });

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateStr = `${date.getDate()}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

      const hasAppointment = appointmentDates.includes(dateStr);

      return hasAppointment ? (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
          <div className="h-1 w-1 bg-blue-600 rounded-full"></div>
        </div>
      ) : null;
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        locale="ro-RO"
        tileContent={tileContent}
        className=" rounded-lg shadow bg-white p-4"
        tileClassName={({ date, view }) =>
          `relative hover:bg-gray-50  ${
            view === "month" &&
            date.toDateString() === new Date().toDateString()
              ? "border-1 border-primary font-semibold"
              : ""
          }`
        }
        navigationLabel={({ date }) =>
          date.toLocaleDateString("ro-RO", { month: "long", year: "numeric" })
        }
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString("ro-RO", { weekday: "short" }).slice(0, 1)
        }
        prevLabel={
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M15 18l-6-6 6-6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        nextLabel={
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M9 18l6-6-6-6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
    </div>
  );
};

export default StyledCalendar;
