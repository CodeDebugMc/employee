import { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Alert,
} from '@mui/material';
import axios from 'axios';

const PostCalendarEvent = () => {
  const [eventData, setEventData] = useState({
    type: 'holiday',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEventData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const { type, startDate, endDate, description } = eventData;

    if (!type || !startDate || !description) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/calendar-events', {
        type,
        start_date: startDate,
        end_date: endDate || startDate,
        description,
      });
      setSuccess('Event successfully added.');
      setError(null);
      setEventData({
        type: 'holiday',
        startDate: '',
        endDate: '',
        description: '',
      });
    } catch (err) {
      console.error(err);
      setError('Failed to post event.');
      setSuccess(null);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        Post Holiday or Suspension
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <TextField
        select
        label="Event Type"
        name="type"
        value={eventData.type}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="holiday">Holiday</MenuItem>
        <MenuItem value="suspension">Suspension</MenuItem>
      </TextField>

      <TextField
        label="Start Date"
        type="date"
        name="startDate"
        value={eventData.startDate}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="End Date (optional)"
        type="date"
        name="endDate"
        value={eventData.endDate}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Description"
        name="description"
        value={eventData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Post Event
      </Button>
    </Paper>
  );
};

export default PostCalendarEvent;
