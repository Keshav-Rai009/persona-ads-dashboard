import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

export default function DateRangeFilter({ onDateChange }) {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleDateChange = (selectedDates) => {
    setDateRange(selectedDates);
    onDateChange(selectedDates);
    setIsCalendarVisible(false);
  };

  return (
    <div className="relative">
      <div
        className="bg-white p-2 border rounded-md cursor-pointer flex items-center text-gray-500"
        onClick={() => setIsCalendarVisible(!isCalendarVisible)}
      >
        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
        <input
          type="text"
          value={`${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`}
          readOnly
          className="border-none focus:outline-none w-full cursor-pointer"
        />
      </div>
      {isCalendarVisible && (
        <div className="absolute z-10 mt-2 bg-white shadow-lg p-4 right-0">
          <Calendar
            onChange={handleDateChange}
            selectRange={true}
            value={dateRange}
            calendarType="iso8601"
          />
        </div>
      )}
    </div>
  );
}
