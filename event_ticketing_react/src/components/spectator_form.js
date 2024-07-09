import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { Typography, CircularProgress, Alert, Box } from '@mui/material';
import InfoLinks from './InfoLinks';


const stripePromise = loadStripe('pk_test_51MvjSdLxodRxB3c1pv7Un3MQGhAjv4m2vP1Z9NhcTgh8ccsEEyUMmFNzFbQ8u6qKBe9xPYuxoUMolooXPhGfCAgo00txYV4Z7v');

function SpectatorForm() {
    const { id } = useParams();
    const [meetName, setMeetName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
            const fetchMeetDetails = async () => {
                try {
                    const response = await axios.get('/home_page/');
                    console.log('Response:', response); // Log the entire response
                    const meet = response.data.find(m => m.id === parseInt(id));
                    if (meet && meet.meet_name) {
                        setMeetName(meet.meet_name);
                    } else {
                        console.error('Meet not found or unexpected response structure:', response.data);
                        setError(true);
                    }
                } catch (error) {
                    console.error('Error fetching meet details:', error); // Log the error
                    setError(true);
                } finally {
                    setLoading(false);
                }
            };

            fetchMeetDetails();
        }, [id]);

    if (loading) {
        return <CircularProgress />;
    }



    return (
         <div className="App">
                   <Typography variant="h4" gutterBottom>
                       Spectator Tickets for: {meetName}
                   </Typography>
                   <Elements stripe={stripePromise}>
                       <CheckoutForm meetId={id} meetName={meetName} />
                   </Elements>
                <InfoLinks />
               </div>
    );
}

export default SpectatorForm;
