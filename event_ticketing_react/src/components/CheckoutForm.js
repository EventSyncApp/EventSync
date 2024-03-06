import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from 'axios';
import StateDropdown from './state_dd.js';
import {FormControl, InputLabel, Select, MenuItem, Grid, TextField, Button, Box,  CircularProgress, Alert, Typography } from '@mui/material';

export default function CheckoutForm() {
  //stripe variables
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  //spectator variables
  const [spectator_fname, setFname] = useState('');
  const [spectator_lname, setLname] = useState('');
  const [spectator_email, setEmail] = useState('');
  const [spectator_state, setState] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const ticket_cost = 60.00; //change latrer to dynamic

  // Testing variables
  /* const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const milliseconds = currentDate.getMilliseconds(); */

  //testing function
  /* useEffect(() => {
    console.log('Component mounted or updated');

    return () => {
      console.log('Component unmounted');
    };
  }); */

 const states = [
        { code: 'AL', name: 'Alabama' },
        { code: 'AK', name: 'Alaska' },
        { code: 'AZ', name: 'Arizona' },
        { code: 'AR', name: 'Arkansas' },
        { code: 'CA', name: 'California' },
        { code: 'CO', name: 'Colorado' },
        { code: 'CT', name: 'Connecticut' },
        { code: 'DE', name: 'Delaware' },
        { code: 'FL', name: 'Florida' },
        { code: 'GA', name: 'Georgia' },
        { code: 'HI', name: 'Hawaii' },
        { code: 'ID', name: 'Idaho' },
        { code: 'IL', name: 'Illinois' },
        { code: 'IN', name: 'Indiana' },
        { code: 'IA', name: 'Iowa' },
        { code: 'KS', name: 'Kansas' },
        { code: 'KY', name: 'Kentucky' },
        { code: 'LA', name: 'Louisiana' },
        { code: 'ME', name: 'Maine' },
        { code: 'MD', name: 'Maryland' },
        { code: 'MA', name: 'Massachusetts' },
        { code: 'MI', name: 'Michigan' },
        { code: 'MN', name: 'Minnesota' },
        { code: 'MS', name: 'Mississippi' },
        { code: 'MO', name: 'Missouri' },
        { code: 'MT', name: 'Montana' },
        { code: 'NE', name: 'Nebraska' },
        { code: 'NV', name: 'Nevada' },
        { code: 'NH', name: 'New Hampshire' },
        { code: 'NJ', name: 'New Jersey' },
        { code: 'NM', name: 'New Mexico' },
        { code: 'NY', name: 'New York' },
        { code: 'NC', name: 'North Carolina' },
        { code: 'ND', name: 'North Dakota' },
        { code: 'OH', name: 'Ohio' },
        { code: 'OK', name: 'Oklahoma' },
        { code: 'OR', name: 'Oregon' },
        { code: 'PA', name: 'Pennsylvania' },
        { code: 'RI', name: 'Rhode Island' },
        { code: 'SC', name: 'South Carolina' },
        { code: 'SD', name: 'South Dakota' },
        { code: 'TN', name: 'Tennessee' },
        { code: 'TX', name: 'Texas' },
        { code: 'UT', name: 'Utah' },
        { code: 'VT', name: 'Vermont' },
        { code: 'VA', name: 'Virginia' },
        { code: 'WA', name: 'Washington' },
        { code: 'WV', name: 'West Virginia' },
        { code: 'WI', name: 'Wisconsin' },
        { code: 'WY', name: 'Wyoming' },
    ];

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post('/create-payment-intent/');
        //console.log(`Current Time: ${hours}:${minutes}:${seconds}.${milliseconds}`); testing line
        const { clientSecret } = response.data;
        setClientSecret(clientSecret);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClientSecret();
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  function handleStateChange(event) {
    setState(event.target.value);
  }

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    axios.post('/add_spectator/', { spectator_fname, spectator_lname, spectator_email, spectator_state, ticket_cost })
    .then((response) => {
        setSuccessMessage('Form submitted successfully!');
        //sendConfirmationEmail();
        console.log(response.data);
    })
    .catch(error => console.log(error));

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
  <>
  <Typography variant="h2" align="center" gutterBottom>
                 Title here
              </Typography>
    <form id="payment-form" onSubmit={handleSubmit}>

     <Typography variant="h4" component="h2" sx={{ textAlign: 'center', marginY: 2 }}>
                Sign Up for ______ meet
              </Typography>
      {/* speactator fields */}
     <Grid container spacing={1}>
                    {/* First Name field */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            required
                            value={spectator_fname}
                            onChange={(event) => setFname(event.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    {/* Last Name field */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            required
                            value={spectator_lname}
                            onChange={(event) => setLname(event.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    {/* Email field */}
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            type="email"
                            required
                            variant="outlined"
                            value={spectator_email}
                            onChange={(event) => setEmail(event.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    {/* State field */}
                    <Grid item xs={12}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="state-select-label">State</InputLabel>
                        <Select
                            labelId="state-select-label"
                            id="state-select"
                            required
                            value={spectator_state}
                            onChange={handleStateChange}
                            label="State"
                            MenuProps={{
                                PaperProps: {
                                    style: { maxHeight: 200 },
                                },
                            }}
                            // Custom rendering for the selected value
                            renderValue={(selected) => (
                                <Box sx={{ textAlign: 'left', width: '100%' }}>
                                    {states.find((state) => state.code === selected)?.name || ''}
                                </Box>
                            )}
                        >
                            {states.map((state) => (
                                <MenuItem key={state.code} value={state.code} sx={{ textAlign: 'left' }}>
                                    {state.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </Grid>
                    {/* Stripe Payment field */}
                    <Grid item xs={12}>

                            <CardElement id="card-element" options={cardStyle} onChange={handleChange} />

                    </Grid>
                </Grid>
      {/* button that submits both spectator info and stripe payment */}
   <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={processing || disabled || succeeded}
                  id="submit"
                  sx={{ mt: 3, mb: 2 }} // Adjust margin top and bottom for spacing
              >
                  {processing ? <CircularProgress size={24} color="inherit" /> : "Checkout"}
              </Button>
      {/* Show any error that happens when processing the payment */}
      {error && (
             <Alert severity="error" role="alert" sx={{ mt: 2 }}>
             {error}
             </Alert>
             )}

      {succeeded && (
        <Typography variant="body1" sx={{ mt: 2, color: 'green' }}>
          Payment succeeded. Email Confirmation sent to {spectator_email}
      </Typography>
    )}
    </form>
    </>
  );
}