import React from 'react';
import { useCalendarEvents } from './hooks';
import CalendarSummaryRow from '../CalendarSummaryRow';
import './index.css';

const CalendarSummary: React.FunctionComponent = () => {
  const numberOfDaysToDisplay = 7;

  const { calendarDataToDispaly, calendarSummaryDataToDispaly } =
    useCalendarEvents(numberOfDaysToDisplay);

  return (
    <div>
      <h2>Calendar summary</h2>
      <table>
        <tbody>
          <CalendarSummaryRow
            date="Date"
            numberOfEvents="Number of events"
            totalDuration="Total duration [min]"
            longestEvent="Longest event"
          />
          {calendarDataToDispaly &&
            calendarDataToDispaly.map((el) => (
              <CalendarSummaryRow
                key={el.date}
                date={el.date}
                numberOfEvents={el.numberOfEvents}
                totalDuration={el.totalDuration}
                longestEvent={el.longestEvent}
              />
            ))}
          <CalendarSummaryRow
            date="Total"
            numberOfEvents={calendarSummaryDataToDispaly.numberOfEvents}
            totalDuration={calendarSummaryDataToDispaly.totalDuration}
            longestEvent={calendarSummaryDataToDispaly.longestEvent}
          />
        </tbody>
      </table>
    </div>
  );
};

export default CalendarSummary;
