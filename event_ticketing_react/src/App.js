import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SpectatorForm from './components/spectator_form.js';
import PaymentSuccess from './components/payment_success.js';
import MeetForm from './components/meet_director_form.js';
import SimpleComponent from './components/SimpleComponent.js';
import './App.css';


function App() {
    return (

            <Router>
                <Routes>

                    <Route exact path="/" element={<SpectatorForm/>} />
                    <Route exact path="/success" element={<PaymentSuccess/>} />
                    <Route exact path="/meet-creation-form" element={<MeetForm/>} />
                     <Route exact path="/test" element={<SimpleComponent/>} />

                </Routes>
            </Router>

    );
}

export default App;
