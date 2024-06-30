import React from 'react';
import { Typography, Box } from '@mui/material';

const Contact = () => {
  return (
    <Box
      mt={10} // Adjusting margin-top to ensure it's below the fixed header
      p={2}
    >
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1">
        You can reach us at contact@example.com or call us at (123) 456-7890.
      </Typography>
    </Box>
  );
};

export default Contact;
