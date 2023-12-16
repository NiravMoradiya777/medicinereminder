import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function preventDefault(event) {
  event.preventDefault();
}

export default function Calendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <React.Fragment>
      <DateCalendar />
      </React.Fragment>
    </LocalizationProvider>
  );
}
