import { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
} from '@mui/material';
import axios from 'axios';

const AdminPostAnnouncement = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    banner: null,
  });

  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'banner') {
      const file = files[0];
      setFormData((prev) => ({ ...prev, banner: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const { title, description, banner } = formData;
    if (!title || !description || !banner) {
      setError('All fields including banner are required');
      return;
    }

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('banner', banner);

    try {
      await axios.post('http://localhost:5000/api/announcements', data);
      setSuccess('Announcement posted successfully!');
      setError('');
      setFormData({ title: '', description: '', banner: null });
      setPreview(null);
    } catch (err) {
      setError('Failed to post announcement');
      setSuccess('');
      console.error(err);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Post New Announcement
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        multiline
        rows={4}
        value={formData.description}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Button variant="outlined" component="label" sx={{ mb: 2 }}>
        Upload Banner
        <input
          hidden
          accept="image/*"
          type="file"
          name="banner"
          onChange={handleChange}
        />
      </Button>

      {preview && (
        <Box sx={{ mb: 2 }}>
          <img
            src={preview}
            alt="Preview"
            style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }}
          />
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Submit Announcement
      </Button>
    </Paper>
  );
};

export default AdminPostAnnouncement;
