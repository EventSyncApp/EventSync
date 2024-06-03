
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';


const stripePromise = loadStripe('pk_test_51MvjSdLxodRxB3c1pv7Un3MQGhAjv4m2vP1Z9NhcTgh8ccsEEyUMmFNzFbQ8u6qKBe9xPYuxoUMolooXPhGfCAgo00txYV4Z7v');
const ticket_cost = 60.00;

function SpectatorForm() {
    const { id } = useParams();
        const [meetName, setMeetName] = useState('');
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(false);


    return (
        <div className="App">
            <Typography variant="h4" gutterBottom>
                Spectator Form for Meet ID: {id}
            </Typography>
            <Elements stripe={stripePromise}>
                <CheckoutForm meetId={id} />
            </Elements>
        </div>
    );
}

export default SpectatorForm;
