import { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Alert,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';

const LeaveApproval = () => {
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [error, setError] = useState(null);
  const [actionStatus, setActionStatus] = useState(null);

  const fetchPendingLeaves = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/leaves/pending');
      setPendingLeaves(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch pending leaves');
    }
  };

  const handleAction = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/leaves/status/${id}`, {
        status,
      });
      setActionStatus(
        `Leave ${status === '1' ? 'approved' : 'rejected'} successfully.`
      );
      fetchPendingLeaves(); // Refresh the list
    } catch (err) {
      console.error(err);
      setError('Failed to update leave status');
    }
  };

  useEffect(() => {
    fetchPendingLeaves();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 1000, margin: 'auto', mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        Pending Leave Approvals
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {actionStatus && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {actionStatus}
        </Alert>
      )}

      {pendingLeaves.length === 0 ? (
        <Typography>No pending leave requests.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Submitted</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingLeaves.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>{leave.username}</TableCell>
                <TableCell>{leave.leave_description}</TableCell>
                <TableCell>{dayjs(leave.date).format('D MMM YYYY')}</TableCell>
                <TableCell>
                  {dayjs(leave.created_at).format('D MMM YYYY h:mm A')}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleAction(leave.id, '1')}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleAction(leave.id, '0')}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default LeaveApproval;
