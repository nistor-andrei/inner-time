"use client";
import { getAppointments } from "@/app/actions/appointments/action";
import { Appointments } from "@/utils/namespace";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useSWR from "swr";
import "./Calendar.css";

interface StyledCalendarProps {
  userId: string;
}

const StyledCalendar = ({ userId }: StyledCalendarProps) => {
  const { data: appointments } = useSWR<Appointments[]>(
    userId ? `/api/appointments/${userId}` : null,
    async () => {
      const response = await getAppointments(userId);
      return response.data || [];
    }
  );

  // Extract and format appointment dates (DD/MM/YYYY)
  const appointmentDates =
    appointments?.map(({ appointment_date }) => {
      const date = new Date(appointment_date); // Parse the date string
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }) || [];

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateStr = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

      const hasAppointment = appointmentDates.includes(dateStr);
      const todayStr = `${String(new Date().getDate()).padStart(2, "0")}/${String(new Date().getMonth() + 1).padStart(2, "0")}/${new Date().getFullYear()}`;
      const isPast = dateStr < todayStr;

      return hasAppointment ? (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
          <div
            className={`h-1 w-1 rounded-full ${isPast ? "bg-gray-400" : "bg-blue-600"}`}
          ></div>
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
