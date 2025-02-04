"use client";
import { useState } from "react";

const AppointmentsTable = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const appointments = [
    {
      nume: "Popescu Maria",
      data: "20 Feb 2025",
      timp: "10:00",
      status: "Confirmat",
    },
    {
      nume: "Popescu Maria",
      data: "31 Ian 2025",
      timp: "10:00",
      status: "Confirmat",
    },
    {
      nume: "Ionescu Dan",
      data: "21 Feb 2025",
      timp: "11:30",
      status: "În așteptare",
    },
    {
      nume: "Popa Alexandru",
      data: "22 Feb 2025",
      timp: "14:00",
      status: "Confirmat",
    },
    {
      nume: "Popa Alexandru",
      data: "22 Feb 2025",
      timp: "14:00",
      status: "Confirmat",
    },
    {
      nume: "Popa Alexandru",
      data: "22 Feb 2025",
      timp: "14:00",
      status: "Confirmat",
    },
  ];

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
                      Timp
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 ${
                        index !== appointments.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <td className="py-3 px-4">{appointment.nume}</td>
                      <td className="py-3 px-4">{appointment.data}</td>
                      <td className="py-3 px-4">{appointment.timp}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            appointment.status === "Confirmat"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "past" && (
            <div className="bg-white border-1 max-h-[300px] overflow-y-auto rounded-md">
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
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">Radu Elena</td>
                    <td className="py-3 px-4">15 Feb 2025</td>
                    <td className="py-3 px-4">09:00</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                        Finalizat
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTable;
