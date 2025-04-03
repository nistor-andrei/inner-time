"use client";
import { getAppointments } from "@/app/actions/appointments/action";
import { Appointments } from "@/utils/namespace";
import moment from "moment";
import { Suspense, useState } from "react";
import { HashLoader } from "react-spinners";
import useSWR from "swr";

const AppointmentsTable = ({ userId }: { userId: string }) => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const { data: appointments } = useSWR<Appointments[]>(
    userId ? `/api/appointments/${userId}` : null,
    async () => {
      const response = await getAppointments(userId);
      return response.data || [];
    }
  );

  const futureAppointments =
    appointments?.filter((appointment) => {
      const appointmentDate = moment(appointment.appointment_date);
      return appointmentDate.isSameOrAfter(moment(), "day");
    }) || [];

  const pastAppointments =
    appointments?.filter((appointment) => {
      const appointmentDate = moment(appointment.appointment_date);
      return appointmentDate.isBefore(moment(), "day"); // Doar programările trecute
    }) || [];

  return (
    <div className="w-full max-w-4xl p-4 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 bg-gray p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === "upcoming" && "bg-primary text-white"
                }`}
              >
                Programări Viitoare
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === "past" && "bg-primary text-white"
                }`}
              >
                Programări Anterioare
              </button>
            </div>

            <button className="flex items-center gap-2 text-primary rounded-md p-2 hover:text-secondary">
              <span>Vezi toate</span>
            </button>
          </div>
          <Suspense fallback={<HashLoader />}>
            {activeTab === "upcoming" && (
              <div className="bg-white border-1 max-h-[200px] overflow-y-auto rounded-md">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white shadow">
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium text-gray-600">
                        Nume
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">
                        Data
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">
                        Ora
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments &&
                      futureAppointments?.map((appointment, index) => {
                        const date = moment(appointment.appointment_date);
                        const dateFormat = date.format("DD.MM.YYYY");
                        const hour = date.format("HH:mm");
                        return (
                          <tr
                            key={index}
                            className={`hover:bg-gray-50 ${
                              index !== appointments.length - 1
                                ? "border-b"
                                : ""
                            }`}
                          >
                            <td className="py-3 px-4">
                              {appointment.client_name}
                            </td>
                            <td className="py-3 px-4">{dateFormat}</td>
                            <td className="py-3 px-4">{hour}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-sm ${
                                  appointment.confirmed
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {appointment.confirmed
                                  ? "Confirmat"
                                  : "Neconfirmat"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "past" && pastAppointments.length > 0 ? (
              <div className="bg-white border max-h-[300px] overflow-y-auto rounded-md">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white shadow">
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium text-gray-600">
                        Nume
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">
                        Data
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">
                        Timp
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastAppointments.map((appointment, index) => {
                      const date = moment(appointment.appointment_date);
                      return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            {appointment.client_name}
                          </td>
                          <td className="py-3 px-4">
                            {date.format("DD MMM YYYY")}
                          </td>
                          <td className="py-3 px-4">{date.format("HH:mm")}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-sm ${
                                appointment.confirmed
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {appointment.confirmed
                                ? "Finalizat"
                                : "Neconfirmat"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              activeTab === "past" && (
                <p className="text-gray-500 text-center py-4">
                  Nu există programări trecute.
                </p>
              )
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTable;
