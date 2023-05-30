import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StateDropdown from './state_dd.js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_51MvjSdLxodRxB3c1pv7Un3MQGhAjv4m2vP1Z9NhcTgh8ccsEEyUMmFNzFbQ8u6qKBe9xPYuxoUMolooXPhGfCAgo00txYV4Z7v');
const ticket_cost = 60.00;

function SpectatorForm() {
    const [clientSecret, setClientSecret] = useState("");

    const [spectator_fname, setFname] = useState('');
    const [spectator_lname, setLname] = useState('');
    const [spectator_email, setEmail] = useState('');
    const [spectator_state, setState] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/add_spectator/', { spectator_fname, spectator_lname, spectator_email, spectator_state, ticket_cost })
            .then((response) => { 
                setSuccessMessage('Form submitted successfully!');
                //sendConfirmationEmail();
                console.log(response.data);
            })
            .catch(error => console.log(error));
    };

    function handleStateChange(event) {
        setState(event.target.value);
    }

    return (
        <div className="App">
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>


    );
}

export default SpectatorForm;