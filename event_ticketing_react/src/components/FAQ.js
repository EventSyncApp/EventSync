import React from 'react';
import { Typography, Box } from '@mui/material';

const FAQ = () => {
  return (
    <Box
      mt={10} // Adjusting margin-top to ensure it's below the fixed header
      p={2}
    >
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>
      <Typography variant="h6" gutterBottom>
        Q: What is the event schedule?
      </Typography>
      <Typography variant="body1" paragraph>
        A: The event schedule is posted on the event page. Please refer to the event details for the full schedule.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Q: How can I register for the event?
      </Typography>
      <Typography variant="body1" paragraph>
        A: You can register for the event through our online registration form available on the event page.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Q: Who can I contact for more information?
      </Typography>
      <Typography variant="body1" paragraph>
        A: For more information, you can contact us at info@example.com or call us at (123) 456-7890.
      </Typography>
    </Box>
  );
};

export default FAQ;
