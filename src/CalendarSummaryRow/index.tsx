import React from 'react';
import { CalendarSummaryRowProps } from './types';

const CalendarSummaryRow: React.FunctionComponent<CalendarSummaryRowProps> = ({
  date,
  numberOfEvents,
  totalDuration,
  longestEvent,
}) => {
  return (
    <tr>
      <td>{date || '-'}</td>
      <td>{numberOfEvents || '-'}</td>
      <td>{totalDuration || '-'}</td>
      <td>{longestEvent || '-'}</td>
    </tr>
  );
};

export default CalendarSummaryRow;
