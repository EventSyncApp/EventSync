import React, { useState } from 'react';
import axios from 'axios';
import CountryDropdown from './country_dd.js';
import StateDropdown from './state_dd.js';

function SpectatorForm() {
    const [spectator_fname, setFname] = useState('');
    const [spectator_lname, setLname] = useState('');
    const [spectator_email, setEmail] = useState('');
    const [spectator_country, setCountry] = useState('');
    const [spectator_state, setState] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/add_spectator/', { spectator_fname, spectator_lname, spectator_email, spectator_country, spectator_state })
            .then((response) => { 
                setSuccessMessage('Form submitted successfully!');
                //sendConfirmationEmail();
                console.log(response.data);
            })
            .catch(error => console.log(error));
    };

//    const sendConfirmationEmail = () => {
//        axios.post('/send_confirmation_email/', { spectator_fname, spectator_lname, spectator_email, spectator_country, spectator_state })
//            .then((response) => {
//                console.log(response);
//            })
//            .catch((error) => {
//                console.error(error);
//            });
//    };

    function handleCountryChange(event) {
        setCountry(event.target.value);
    }

    function handleStateChange(event) {
        setState(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>First Name:</label>
            <input type="text" value={spectator_fname} onChange={(event) => setFname(event.target.value)} />
            <br />
            <label>Last Name:</label>
            <input type="text" value={spectator_lname} onChange={(event) => setLname(event.target.value)} />
            <br />
            <label>Email:</label>
            <input type="email" value={spectator_email} onChange={(event) => setEmail(event.target.value)} />
            <br />
            <label>Country:</label>
            <CountryDropdown name="country" value={spectator_country} onChange={handleCountryChange} />
            <br />
            <label>State:</label>
            <StateDropdown name="state" value={spectator_state} onChange={handleStateChange} />
            <br />
            <button type="submit">Submit</button>
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
}

export default SpectatorForm;