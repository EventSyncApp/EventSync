import React from 'react';
import { Typography, Box } from '@mui/material';

const InfoLinks = () => {
  return (
    <Box mt={2}>
      <Typography variant="body2" gutterBottom>
        Contact
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
        Faq
      </Typography>
    </Box>
  );
};

export default InfoLinks;
