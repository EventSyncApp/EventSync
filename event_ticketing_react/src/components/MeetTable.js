import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Link as MuiLink
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const MeetTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/home_page/');
        console.log(response.data); // Check the structure here
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Error fetching data. Please try again later.</Alert>;
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" gutterBottom component="div" align="center">
       Select a meet to sign up to attend
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Meet Name</TableCell>
            <TableCell>Meet Date</TableCell>
            <TableCell>Meet Time Start</TableCell>
            <TableCell>Meet Location Venue</TableCell>
            <TableCell>Meet Location Address</TableCell>
            {/* Add more TableCells as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} component={RouterLink} to={`/spectator/${row.id}`} style={{ textDecoration: 'none' }}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                <MuiLink component={RouterLink} to={`/spectator/${row.id}`} underline="none" color="inherit">
                  {row.meet_name}
                </MuiLink>
              </TableCell>
              <TableCell>{row.meet_date}</TableCell>
              <TableCell>{row.meet_time_start}</TableCell>
              <TableCell>{row.meet_location_venue}</TableCell>
              <TableCell>{row.meet_location_address}</TableCell>
              {/* Add more TableCells as needed */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MeetTable;
