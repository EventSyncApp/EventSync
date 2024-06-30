import React from 'react';
import { Typography, Box, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const InfoLinks = () => {
  return (
    <Box
      width="100%"
      bgcolor="grey.200"
      p={2}
      position="fixed"
      top={0}
      left={0}
      display="flex"
      alignItems="center"
      borderBottom={1}
      borderColor="grey.400"
      zIndex="appBar" // Ensure the header stays on top
    >
      <Box display="flex" justifyContent="flex-start" width="100%" gap={4}>
        <Typography variant="body2" component="div">
          <MuiLink component={RouterLink} to="/" underline="none" color="inherit">
            Home
          </MuiLink>
        </Typography>
        <Typography variant="body2" component="div">
          <MuiLink component={RouterLink} to="/contact" underline="none" color="inherit">
            Contact
          </MuiLink>
        </Typography>
        <Typography variant="body2" component="div">
          <MuiLink component={RouterLink} to="/faq" underline="none" color="inherit">
            FAQ
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoLinks;
