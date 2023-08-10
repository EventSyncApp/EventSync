import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StateDropdown from './state_dd.js';

export default function MeetForm() {
    //meet variables
    const [meet_name, setMeetname] = useState('');
    const [meet_date, setMeetdate] = useState('');
    const [meet_time_start, setTime] = useState('');
    const [meet_location_venue, setVenue] = useState('');
    const [meet_location_address, setAddress] = useState('');
    const [meet_location_city, setCity] = useState('');
    const [meet_location_state, setState] = useState('');
    const [meet_location_zipcode, setZip] = useState('');
    const [meet_about_text, setAbout] = useState('');
    const [max_capacity, setCapacity] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    function handleStateChange(event) {
        setState(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/add_meet/', { meet_name, meet_date, meet_time_start, meet_location_venue, meet_location_address, meet_location_city, meet_location_state, meet_location_zipcode, meet_about_text, max_capacity })
            .then((response) => { 
                setSuccessMessage('Form submitted successfully!');
                //sendConfirmationEmail();
                console.log(response.data);
            })
            .catch(error => console.log(error));
    };

    return (
        <form id="meet-director-form" onSubmit={handleSubmit}>
            {/* meet fields */}
            <label>Meet Name:</label>
            <input type="text" value={meet_name} onChange={(event) => setMeetname(event.target.value)} />
            <br />
            <label>Meet Date:</label>
            <input type="text" value={meet_date} onChange={(event) => setMeetdate(event.target.value)} />
            <br />
            <label>Start Time of the Powerlifting Meet:</label>
            <input type="text" value={meet_time_start} onChange={(event) => setTime(event.target.value)} />
            <br />
            <label>Venue Name:</label>
            <input type="text" value={meet_location_venue} onChange={(event) => setVenue(event.target.value)} />
            <br />
            <label>Venue Address:</label>
            <input type="text" value={meet_location_address} onChange={(event) => setAddress(event.target.value)} />
            <br />
            <label>Venue City:</label>
            <input type="text" value={meet_location_city} onChange={(event) => setCity(event.target.value)} />
            <br />
            <label>Venue State:</label>
            <StateDropdown name="state" value={meet_location_state} onChange={handleStateChange} />
            <br />
            <label>Venue Zipcode:</label>
            <input type="text" value={meet_location_zipcode} onChange={(event) => setZip(event.target.value)} />
            <br />
            <label>Description for the Meet:</label>
            <input type="text" value={meet_about_text} onChange={(event) => setAbout(event.target.value)} />
            <br />
            <label>Spectator Capacity for the Meet:</label>
            <input type="text" value={max_capacity} onChange={(event) => setCapacity(event.target.value)} />
            <br />
            <button type="submit">Submit</button>
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
}