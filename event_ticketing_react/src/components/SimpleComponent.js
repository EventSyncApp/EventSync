import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import StateDropdown from './state_dd.js'; // Ensure this dropdown is also styled with Material-UI if possible
import SaveIcon from '@mui/icons-material/Save';
import { Button, TextField, CircularProgress, FormControl, InputLabel, Select, MenuItem, Typography, Card, CardContent } from '@mui/material';

export default function CheckoutForm() {
  // Stripe variables
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  // Spectator variables
  const [spectator_fname, setFname] = useState('');
  const [spectator_lname, setLname] = useState('');
  const [spectator_email, setEmail] = useState('');
  const [spectator_state, setState] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const ticket_cost = 60.00; // Change later to dynamic

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post('/create-payment-intent/');
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
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    // Post to your backend to add spectator, then handle payment
    // This is a simplified flow assuming your backend handles these correctly

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setSuccessMessage('Payment succeeded! Email confirmation sent.');
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <form id="payment-form" onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Spectator Information
          </Typography>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={spectator_fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={spectator_lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={spectator_email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>State</InputLabel>
            <Select
              value={spectator_state}
              onChange={(e) => setState(e.target.value)}
              label="State"
            >
              {/* Populate this Select with your States as MenuItems */}
              <StateDropdown />
            </Select>
          </FormControl>
          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Payment Details
          </Typography>
          <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={processing || disabled || succeeded}
            startIcon={processing ? <CircularProgress size={24} /> : <SaveIcon />}
            style={{ marginTop: '20px' }}
          >
            {processing ? 'Processing...' : 'Checkout'}
          </Button>
          {error && <Typography color="error" style={{ marginTop: '20px' }}>{error}</Typography>}
          {successMessage && <Typography color="primary" style={{ marginTop: '20px' }}>{successMessage}</Typography>}
        </form>
      </CardContent>
    </Card>
  );
}
