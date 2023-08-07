import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_51MvjSdLxodRxB3c1pv7Un3MQGhAjv4m2vP1Z9NhcTgh8ccsEEyUMmFNzFbQ8u6qKBe9xPYuxoUMolooXPhGfCAgo00txYV4Z7v');
const ticket_cost = 60.00;

function SpectatorForm() {
    return (
        <div className="App">
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
}

export default SpectatorForm;