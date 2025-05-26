import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const AdminCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/calendar-events');
      const formatted = res.data.map((e) => ({
        id: e.id.toString(),
        title: e.description,
        start: e.start_date,
        end: e.end_date,
        type: e.type,
        backgroundColor: e.type === 'holiday' ? '#4caf50' : '#f44336',
        borderColor: e.type === 'holiday' ? '#4caf50' : '#f44336',
        textColor: 'white',
      }));
      setEvents(formatted);
    } catch (err) {
      console.error('Failed to load events', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventClick = ({ event }) => {
    setSelectedEvent({
      id: event.id,
      title: event.title,
      type: event.extendedProps.type,
      start: event.startStr,
      end: event.endStr,
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/calendar-events/${selectedEvent.id}`,
        {
          description: selectedEvent.title,
          type: selectedEvent.type,
          start_date: selectedEvent.start,
          end_date: selectedEvent.end || selectedEvent.start,
        }
      );

      setEditDialogOpen(false);
      setSelectedEvent(null);
      fetchEvents(); // Refresh the calendar
    } catch (err) {
      console.error('Failed to update event', err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Calendar - Holidays & Suspensions</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          height="auto"
        />
      )}

      {/* Edit Event Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Calendar Event</DialogTitle>
        <DialogContent>
          <TextField
            label="Description"
            fullWidth
            value={selectedEvent?.title || ''}
            onChange={(e) =>
              setSelectedEvent((prev) => ({ ...prev, title: e.target.value }))
            }
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Type"
            fullWidth
            value={selectedEvent?.type || ''}
            onChange={(e) =>
              setSelectedEvent((prev) => ({ ...prev, type: e.target.value }))
            }
            sx={{ mb: 2 }}
          >
            <MenuItem value="holiday">Holiday</MenuItem>
            <MenuItem value="suspension">Suspension</MenuItem>
          </TextField>
          <TextField
            type="date"
            label="Start Date"
            fullWidth
            value={selectedEvent?.start || ''}
            onChange={(e) =>
              setSelectedEvent((prev) => ({ ...prev, start: e.target.value }))
            }
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date"
            label="End Date"
            fullWidth
            value={selectedEvent?.end || ''}
            onChange={(e) =>
              setSelectedEvent((prev) => ({ ...prev, end: e.target.value }))
            }
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminCalendar;
