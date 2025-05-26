import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

const AnnouncementCarousel = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/announcements');
      setAnnouncements(res.data);
    } catch (err) {
      console.error('Failed to load announcements', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  if (loading) return <CircularProgress />;

  if (!announcements.length)
    return <Typography>No announcements yet.</Typography>;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
      >
        {announcements.map((a) => (
          <SwiperSlide key={a.id}>
            <Card sx={{ borderRadius: 3 }}>
              {a.banner && (
                <CardMedia
                  component="img"
                  height="300"
                  image={`http://localhost:5000/uploads/${a.banner}`}
                  alt="Announcement Banner"
                />
              )}
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {a.title}
                </Typography>
                <Typography variant="body1">{a.description}</Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default AnnouncementCarousel;
