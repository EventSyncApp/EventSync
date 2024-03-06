import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StateDropdown from './state_dd.js';
import {FormControl, InputLabel, Select, MenuItem, Grid, TextField, Button, Box,  CircularProgress, Alert, Typography } from '@mui/material';


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

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/add_meet/', { meet_name, meet_date, meet_time_start, meet_location_venue, meet_location_address, meet_location_city, meet_location_state, meet_location_zipcode, meet_about_text, max_capacity })
            .then((response) => { 
                setSuccessMessage('Form submitted successfully!');
                //sendConfirmationEmail();
                console.log(response.data);
            })
            .catch(error => console.log(error));
        setMeetname('');
        setMeetdate('');
        setTime('');
        setVenue('');
        setAddress('');
        setCity('');
        setState('');
        setZip('');
        setAbout('');
        setCapacity('');
        setSuccessMessage('');
    };

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

    return (
        <form id="meet-director-form" onSubmit={handleSubmit}>
             <Typography variant="h4" component="h2" sx={{ textAlign: 'center', marginY: 2 }}>
               Create a meet
             </Typography>

             <Grid container direction="column" spacing={1}>
               {/* Meet Name */}
               <Grid item>
                 <TextField
                   label="Meet Name"
                   variant="outlined"
                   fullWidth
                   required
                   value={meet_name}
                   onChange={(event) => setMeetname(event.target.value)}
                 />
               </Grid>

               {/* Meet Date */}
               <Grid item>
                 <TextField
                   label="Meet Date"
                   type="date"
                   variant="outlined"
                   required
                   fullWidth
                   InputLabelProps={{ shrink: true }}
                   value={meet_date}
                   onChange={(event) => setMeetdate(event.target.value)}
                 />
               </Grid>

               {/* Start Time of the Powerlifting Meet */}
               <Grid item>
                 <TextField
                   label="Start Time of the Powerlifting Meet"
                   type="time"
                   variant="outlined"
                   required
                   fullWidth
                   InputLabelProps={{ shrink: true }}
                   value={meet_time_start}
                   onChange={(event) => setTime(event.target.value)}
                 />
               </Grid>

               {/* Venue Name */}
               <Grid item>
                 <TextField
                   label="Venue Name"
                   variant="outlined"
                   required
                   fullWidth
                   value={meet_location_venue}
                   onChange={(event) => setVenue(event.target.value)}
                 />
               </Grid>

               {/* Venue Address */}
               <Grid item>
                 <TextField
                   label="Venue Address"
                   variant="outlined"
                   required
                   fullWidth
                   value={meet_location_address}
                   onChange={(event) => setAddress(event.target.value)}
                 />
               </Grid>

               {/* Venue City */}
               <Grid item>
                 <TextField
                   label="Venue City"
                   variant="outlined"
                   required
                   fullWidth
                   value={meet_location_city}
                   onChange={(event) => setCity(event.target.value)}
                 />
               </Grid>

               {/* Venue State */}
               <Grid item>
                 <FormControl fullWidth required margin="normal">
                   <InputLabel id="venue-state-label">Venue State</InputLabel>
                   <Select
                     labelId="venue-state-label"
                     id="venue-state-select"
                     value={meet_location_state}
                     onChange={(event) => setState(event.target.value)}
                     MenuProps={{
                       PaperProps: {
                         style: {
                           maxHeight: 200,
                         },
                       },
                     }}
                   >
                     {states.map((state) => (
                       <MenuItem key={state.code} value={state.code}>{state.name}</MenuItem>
                     ))}
                   </Select>
                 </FormControl>
               </Grid>

               {/* Venue Zipcode */}
               <Grid item>
                 <TextField
                   label="Venue Zipcode"
                   variant="outlined"
                   required
                   fullWidth
                   value={meet_location_zipcode}
                   onChange={(event) => setZip(event.target.value)}
                   margin="normal"
                 />
               </Grid>

               {/* Description for the Meet */}
               <Grid item>
                 <TextField
                   label="Description for the Meet"
                   variant="outlined"
                   required
                   fullWidth
                   multiline
                   rows={4}
                   value={meet_about_text}
                   onChange={(event) => setAbout(event.target.value)}
                   margin="normal"
                 />
               </Grid>

               {/* Spectator Capacity for the Meet */}
               <Grid item>
                 <TextField
                   label="Spectator Capacity for the Meet"
                   variant="outlined"
                   required
                   fullWidth
                   value={max_capacity}
                   onChange={(event) => setCapacity(event.target.value)}
                   margin="normal"
                 />
               </Grid>

               {/* Submit Button */}
               <Grid item>
                 <Button type="submit" variant="contained" color="primary" fullWidth>
                   Submit
                 </Button>
               </Grid>

               {/* Success Message */}
               {successMessage && (
                 <Grid item>
                   <Typography variant="body1" color="success" sx={{ mt: 2 }}>
                     {successMessage}
                   </Typography>
                 </Grid>
               )}
             </Grid>
           </form>
    );
}
