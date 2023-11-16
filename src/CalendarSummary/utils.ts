import { CalendarEvent } from '../api-client';
import { CalendarEventRawRow, CalendarEventsData } from './types';

const prepareDate = (date: Date) => {
  const year = date.getFullYear();
  const monthRaw = date.getMonth() + 1;
  const dayRaw = date.getDate();

  const month = monthRaw < 10 ? `0${monthRaw}` : monthRaw;
  const day = dayRaw < 10 ? `0${dayRaw}` : dayRaw;

  return `${year}-${month}-${day}`;
};

const prepareNumberOfEvents = (events: CalendarEvent[]) => {
  return events.length;
};

const prepareTotalNumberOfEvents = (events: CalendarEventRawRow[]) => {
  return events.reduce((acc, curr) => {
    if (!curr || !curr.numberOfEvents) return acc;
    return acc + curr.numberOfEvents;
  }, 0);
};

const prepareDuration = (events: CalendarEvent[]) => {
  return events.reduce((acc, curr) => {
    if (!curr || !curr.durationInMinutes) return acc;
    return acc + curr.durationInMinutes;
  }, 0);
};

const prepareTotalDuration = (events: CalendarEventRawRow[]) => {
  return events.reduce((acc, curr) => {
    if (!curr.totalDuration) return acc;
    return acc + curr.totalDuration;
  }, 0);
};

const prepareLongestEvent = (events: CalendarEvent[]) => {
  return events
    .filter((el) => el.durationInMinutes !== undefined)
    .sort((a, b) => b.durationInMinutes - a.durationInMinutes)[0];
};

const prepareSummaryLongestEvent = (events: CalendarEventRawRow[]) => {
  const sortedEvents = events
    .filter(
      (el) =>
        el.longestEvent !== undefined &&
        el.longestEvent.durationInMinutes !== undefined
    )
    .sort((a, b) => {
      return (
        b.longestEvent.durationInMinutes - a.longestEvent.durationInMinutes
      );
    });
  if (!sortedEvents[0] || !sortedEvents[0].longestEvent) return '';
  return sortedEvents[0].longestEvent.title;
};

const prepareCalendarEvenetsRawData = (calendarData: CalendarEventsData) => {
  if (!calendarData) return;
  return calendarData
    .filter((el) => el.date !== undefined && el.events !== undefined)
    .map((el) => {
      return {
        date: prepareDate(el.date),
        numberOfEvents: prepareNumberOfEvents(el.events),
        totalDuration: prepareDuration(el.events),
        longestEvent: prepareLongestEvent(el.events),
      };
    });
};

const prepareCalendarEvenetsData = (
  preparedCalendarEvenetsRawData: CalendarEventRawRow[]
) => {
  return preparedCalendarEvenetsRawData.map((el) => {
    return {
      date: el.date,
      numberOfEvents: el.numberOfEvents?.toString(),
      totalDuration: el.totalDuration?.toString(),
      longestEvent: el.longestEvent?.title,
    };
  });
};

const prepareSummaryCalendarEvenetsData = (
  preparedCalendarEvenetsRawData: CalendarEventRawRow[]
) => {
  return {
    date: 'Total',
    numberOfEvents: prepareTotalNumberOfEvents(
      preparedCalendarEvenetsRawData
    ).toString(),
    totalDuration: prepareTotalDuration(
      preparedCalendarEvenetsRawData
    ).toString(),
    longestEvent: prepareSummaryLongestEvent(preparedCalendarEvenetsRawData),
  };
};

export const prepareCalendarDataToDisplay = (
  calendarData: CalendarEventsData
) => {
  const preparedCalendarEvenetsRawData =
    prepareCalendarEvenetsRawData(calendarData);

  if (!preparedCalendarEvenetsRawData) return;

  const preparedCalendarEvenetsData = prepareCalendarEvenetsData(
    preparedCalendarEvenetsRawData
  );

  const preparedSummaryCalendarEvenetsData = prepareSummaryCalendarEvenetsData(
    preparedCalendarEvenetsRawData
  );

  return { preparedCalendarEvenetsData, preparedSummaryCalendarEvenetsData };
};
