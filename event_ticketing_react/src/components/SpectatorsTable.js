import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Box } from '@mui/material';

const SpectatorsTable = () => {
  const { meetId } = useParams();  // Get the meetId from the route parameters
  const [spectators, setSpectators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching spectators for meet ID:', meetId);  // Log the meet ID
    const fetchSpectators = async () => {
      try {
        const response = await axios.get(`/spectators_by_meet/${meetId}/`);
        console.log('Fetched spectators:', response.data);  // Log the response data
        setSpectators(response.data);
      } catch (error) {
        console.error('Error fetching spectators:', error);  // Log the error
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpectators();
  }, [meetId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading spectators: {error.message}</Typography>;

  return (
    <Box display="flex" justifyContent="center" padding="20px">
      <TableContainer component={Paper} sx={{ width: '90%', maxWidth: '1200px', maxHeight: '600px', overflowY: 'auto', overflowX: 'hidden', paddingRight: '17px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Ticket Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {spectators.map((spectator, index) => (
              <TableRow key={index}>
                <TableCell>{spectator.spectator_fname}</TableCell>
                <TableCell>{spectator.spectator_lname}</TableCell>
                <TableCell>{spectator.spectator_email}</TableCell>
                <TableCell>{spectator.spectator_state}</TableCell>
                <TableCell>{spectator.meets.ticket_cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SpectatorsTable;
