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
  Box,
  TextField,
  Link as MuiLink
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import InfoLinks from './InfoLinks';

const MeetTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/home_page/');
        console.log(response.data); // Check the structure here
        setData(response.data);
        setFilteredData(response.data); // Initially show all data
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((meet) =>
        meet.meet_name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, data]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Error fetching data. Please try again later.</Alert>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom component="div" align="center">
        Logo Here
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={4}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Upcoming Meets</Typography>
                  <TextField
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter by name"
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Meet Name</TableCell>
              <TableCell>Meet Date</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow
                key={row.id}
                component={RouterLink}
                to={`/spectator/${row.id}`}
                style={{ textDecoration: 'none' }}
              >
                <TableCell>
                  <MuiLink
                    component={RouterLink}
                    to={`/spectator/${row.id}`}
                    underline="none"
                    color="inherit"
                  >
                    {row.meet_name}
                  </MuiLink>
                </TableCell>
                <TableCell>{row.meet_date}</TableCell>
                <TableCell>{row.meet_location_venue}</TableCell>
                <TableCell>{row.meet_location_state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <InfoLinks /> {/* Include the new InfoLinks component */}
    </Box>
  );
};

export default MeetTable;
