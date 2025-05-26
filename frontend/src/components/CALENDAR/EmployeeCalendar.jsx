import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Paper, Typography, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

const EmployeeCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const typeColors = {
    holiday: '#4caf50',
    suspension: '#f44336',
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/calendar-events'
        );
        const mapped = res.data.map((ev) => ({
          title: ev.description,
          start: ev.start_date,
          end: ev.end_date || ev.start_date,
          backgroundColor: typeColors[ev.type] || '#2196f3',
          borderColor: typeColors[ev.type] || '#2196f3',
        }));
        setEvents(mapped);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography>Loading calendar...</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Holiday & Suspension Calendar
      </Typography>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </Paper>
  );
};

export default EmployeeCalendar;
