import { CalendarEvent } from '../api-client';

interface CalendarEventData {
  date: Date;
  events: CalendarEvent[];
}

export interface CalendarEventsData extends Array<CalendarEventData> {}

export interface CalendarEventRawRow {
  date: string;
  numberOfEvents: number;
  totalDuration: number;
  longestEvent: CalendarEvent;
}

export interface CalendarEventRow {
  date: string;
  numberOfEvents: string;
  totalDuration: string;
  longestEvent: string;
}
