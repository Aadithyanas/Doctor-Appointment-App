import React, { useState, useEffect } from "react";
import { useTheme } from "../contex/ThemeContext";
import { Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";

import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  getDay,
  addMonths,
  subMonths,
  isSameDay,
  isToday
} from "date-fns";

const Dashboard = () => {
  const location = useLocation();
  const selectedDoctor = location.state?.selectedDoctor;
  const [appointments, setAppointments] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAddingAppointment, setIsAddingAppointment] = useState(!!selectedDoctor);
  const [isLoading, setIsLoading] = useState(true);
  const [newAppointment, setNewAppointment] = useState({
    doctor: selectedDoctor?.name || "",
    specialization: selectedDoctor?.specialization || "",
    time: "",
    date: "",
    notes: ""
  });

  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;

  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
        setAppointments(storedAppointments);
      } catch (error) {
        console.error("Error loading appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAppointments();
  }, []);

  const saveAppointments = async (updatedAppointments) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate saving
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error saving appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleAddAppointment = () => {
    if (selectedDate) {
      setNewAppointment({
        ...newAppointment,
        date: selectedDate
      });
      setIsAddingAppointment(true);
    }
  };

  const handleSaveAppointment = async () => {
    if (newAppointment.doctor && newAppointment.time) {
      const updatedAppointments = [...appointments, {
        ...newAppointment,
        date: selectedDate || format(new Date(), "yyyy-MM-dd")
      }];
      await saveAppointments(updatedAppointments);
      setIsAddingAppointment(false);
      setNewAppointment({
        doctor: "",
        specialization: "",
        time: "",
        date: "",
        notes: ""
      });
    }
  };

  const handleDeleteAppointment = async (appointmentToDelete) => {
    const updatedAppointments = appointments.filter(
      appointment => 
        appointment.date !== appointmentToDelete.date || 
        appointment.doctor !== appointmentToDelete.doctor || 
        appointment.time !== appointmentToDelete.time
    );
    await saveAppointments(updatedAppointments);
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Loader2 className={`w-12 h-12 animate-spin ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 transition-all duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`rounded-lg shadow-lg p-6 mb-6 transition-all duration-300 transform hover:shadow-xl ${
        isDark ? 'bg-gray-800 shadow-gray-900/50' : 'bg-white shadow-gray-200/50'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            Medical Appointments
          </h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handlePrevMonth} 
              className={`p-2 rounded-full transition-all duration-200 ${
                isDark 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <h2 className={`text-xl font-semibold w-48 text-center ${
              isDark ? 'text-gray-100' : 'text-gray-700'
            }`}>
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button 
              onClick={handleNextMonth} 
              className={`p-2 rounded-full transition-all duration-200 ${
                isDark 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className={`font-semibold p-2 text-center ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array(getDay(startOfMonth(currentMonth)))
            .fill(null)
            .map((_, index) => (
              <div 
                key={`empty-${index}`} 
                className={`border rounded-lg h-24 transition-colors duration-200 ${
                  isDark 
                    ? 'border-gray-700 bg-gray-800' 
                    : 'border-gray-100 bg-gray-50'
                }`}
              />
            ))}
          
          {daysInMonth.map((day) => {
            const formattedDate = format(day, "yyyy-MM-dd");
            const dayAppointments = appointments.filter(
              (appointment) => appointment.date === formattedDate
            );
            const isSelected = selectedDate === formattedDate;
            const dayIsToday = isToday(day);

            return (
              <div
                key={formattedDate}
                className={`border rounded-lg p-2 h-24 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                  isSelected 
                    ? isDark
                      ? "ring-2 ring-blue-500 border-blue-500 bg-gray-700"
                      : "ring-2 ring-blue-500 border-blue-500 bg-blue-50"
                    : isDark
                      ? "hover:border-blue-400 bg-gray-800 border-gray-700"
                      : "hover:border-blue-300 bg-white border-gray-200"
                } ${
                  dayIsToday 
                    ? isDark
                      ? "bg-blue-900/30"
                      : "bg-blue-50"
                    : ""
                }`}
                onClick={() => setSelectedDate(formattedDate)}
              >
                <div className="flex justify-between items-center mb-1">
                  <p className={`text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center transition-colors duration-200 ${
                    dayIsToday 
                      ? "bg-blue-500 text-white" 
                      : isDark
                        ? "text-gray-300"
                        : "text-gray-700"
                  }`}>
                    {format(day, "d")}
                  </p>
                  {dayAppointments.length > 0 && (
                    <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-200 ${
                      isDark
                        ? 'bg-blue-900/50 text-blue-300'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {dayAppointments.length}
                    </span>
                  )}
                </div>
                <div className="overflow-y-auto max-h-12">
                  {dayAppointments.slice(0, 2).map((appointment, index) => (
                    <p 
                      key={index} 
                      className={`text-xs truncate mb-1 py-1 px-2 rounded transition-colors duration-200 ${
                        isDark
                          ? 'bg-blue-900/30 text-blue-300'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {appointment.time} - {appointment.doctor}
                    </p>
                  ))}
                  {dayAppointments.length > 2 && (
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      +{dayAppointments.length - 2} more
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedDate && !isAddingAppointment && (
        <div className={`rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:shadow-xl ${
          isDark ? 'bg-gray-800 shadow-gray-900/50' : 'bg-white shadow-gray-200/50'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              Appointments: {format(new Date(selectedDate), "MMMM d, yyyy")}
            </h2>
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                  isDark
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/30'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200/50'
                }`}
                onClick={handleAddAppointment}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Appointment
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                onClick={() => setSelectedDate(null)}
              >
                Close
              </button>
            </div>
          </div>

          {appointments.filter((appointment) => appointment.date === selectedDate).length === 0 ? (
            <p className={`text-center py-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No appointments scheduled for this day.
            </p>
          ) : (
            <div className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {appointments
                .filter((appointment) => appointment.date === selectedDate)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((appointment, index) => (
                  <div key={index} className="py-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-1">
                        <svg className={`w-4 h-4 mr-2 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className={`font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                          {appointment.time}
                        </span>
                      </div>
                      <div className="ml-6">
                        <h3 className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                          {appointment.doctor}
                        </h3>
                        {appointment.specialization && (
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {appointment.specialization}
                          </p>
                        )}
                        {appointment.notes && (
                          <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            {appointment.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteAppointment(appointment)}
                      className={`p-1 rounded transition-all duration-200 ${
                        isDark
                          ? 'text-red-400 hover:text-red-300 hover:bg-red-900/30'
                          : 'text-red-500 hover:text-red-700 hover:bg-red-50'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {isAddingAppointment && (
        <div className={`rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:shadow-xl ${
          isDark ? 'bg-gray-800 shadow-gray-900/50' : 'bg-white shadow-gray-200/50'
        }`}>
          <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
            New Appointment: {format(new Date(selectedDate), "MMMM d, yyyy")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="doctor" className={`block text-sm font-medium mb-1 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Doctor Name*
              </label>
              <input
                type="text"
                id="doctor"
                className={`w-full p-2 rounded-md transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                value={newAppointment.doctor}
                onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label htmlFor="specialization" className={`block text-sm font-medium mb-1 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Specialization
              </label>
              <input
                type="text"
                id="specialization"
                className={`w-full p-2 rounded-md transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                value={newAppointment.specialization}
                onChange={(e) => setNewAppointment({...newAppointment, specialization: e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="time" className={`block text-sm font-medium mb-1 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Time*
              </label>
              <input
                type="time"
                id="time"
                className={`w-full p-2 rounded-md transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-gray-100' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="notes" className={`block text-sm font-medium mb-1 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Notes
              </label>
              <textarea
                id="notes"
                rows="3"
                className={`w-full p-2 rounded-md transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
              onClick={() => setIsAddingAppointment(false)}
            >
              Cancel
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark
                  ? 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-700 disabled:text-gray-500'
                  : 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:text-gray-500'
              }`}
              onClick={handleSaveAppointment}
              disabled={!newAppointment.doctor || !newAppointment.time}
            >
              Save Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;