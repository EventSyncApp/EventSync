import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const PaymentSuccess = ({ spectator_fname, spectator_lname, spectator_email, spectator_state, ticket_cost, meetName }) => {
  return (
    <Box mt={2} p={2}>
      <Typography variant="h4" gutterBottom>
        See you at {meetName}!
      </Typography>
      <Typography variant="body1">
        Thank you, {spectator_fname} {spectator_lname}, we've sent you an email confirmation
      </Typography>
      <Typography variant="body1">
        to {spectator_email} with your tickets attached.
      </Typography>
      <Typography variant="body1">
        Please reach out to EventSyncApp@gmail.com with any questions
      </Typography>
      <Typography variant="body1">
        Amount Paid: ${ticket_cost}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/" // Link to the home page
        sx={{ mt: 2 }} // Optional: add margin top for spacing
      >
        Go back to Home Page
      </Button>
    </Box>
  );
};

export default PaymentSuccess;
