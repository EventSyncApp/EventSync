import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from 'axios';
import StateDropdown from './state_dd.js';

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
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* speactator fields */}
      <label>First Name:</label>
      <input type="text" value={spectator_fname} onChange={(event) => setFname(event.target.value)} />
      <br />
      <label>Last Name:</label>
      <input type="text" value={spectator_lname} onChange={(event) => setLname(event.target.value)} />
      <br />
      <label>Email:</label>
      <input type="email" value={spectator_email} onChange={(event) => setEmail(event.target.value)} />
      <br />
      <label>State:</label>
      <StateDropdown name="state" value={spectator_state} onChange={handleStateChange} />
      <br />

      {/* stripe payment */}
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />

      {/* button that submits both spectator info and stripe payment */}
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Checkout"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded {"\n"}
        Email Confirmation sent to { spectator_email }
      </p>
    </form>
  );
}