import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllSpectatorsTable = () => {
  const [spectators, setSpectators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpectators = async () => {
      try {
        const response = await axios.get('/api/all_spectators/');
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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading spectators: {error.message}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Ticket Cost</th>
        </tr>
      </thead>
      <tbody>
        {spectators.map(spectator => (
          <tr key={spectator.id}>
            <td>{spectator.id}</td>
            <td>{spectator.name}</td>
            <td>{spectator.email}</td>
            <td>{spectator.ticket_cost}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllSpectatorsTable;
