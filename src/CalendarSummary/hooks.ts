import { useEffect, useState } from 'react';
import { getCalendarEvents } from '../api-client';
import { prepareCalendarDataToDisplay } from './utils';
import { CalendarEventsData, CalendarEventRow } from './types';

export const useCalendarEvents = (numberOfDaysToDisplay: number) => {
  const [calendarData, setCalendarData] = useState<CalendarEventsData>([]);
  const [calendarDataToDispaly, setCalendarDataToDispaly] = useState<
    CalendarEventRow[]
  >([]);
  const [calendarSummaryDataToDispaly, setCalendarSummaryDataToDispaly] =
    useState<CalendarEventRow>({
      date: '',
      numberOfEvents: '',
      totalDuration: '',
      longestEvent: '',
    });

  const getCalendarData = async () => {
    try {
      const currentDate = new Date();
      const calendarData = [...new Array(numberOfDaysToDisplay)].map(
        async (_, index) => {
          const date = new Date();
          date.setDate(currentDate.getDate() + index);
          const events = await getCalendarEvents(date);
          return { date, events };
        }
      );

      const resolvedData = await Promise.all(calendarData);
      setCalendarData(resolvedData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getCalendarData();
  }, [numberOfDaysToDisplay]);

  useEffect(() => {
    const preparedData = prepareCalendarDataToDisplay(calendarData);

    if (!preparedData) return;

    const { preparedCalendarEvenetsData, preparedSummaryCalendarEvenetsData } =
      preparedData;

    setCalendarDataToDispaly(preparedCalendarEvenetsData);
    setCalendarSummaryDataToDispaly(preparedSummaryCalendarEvenetsData);
  }, [calendarData]);

  return { calendarDataToDispaly, calendarSummaryDataToDispaly };
};
