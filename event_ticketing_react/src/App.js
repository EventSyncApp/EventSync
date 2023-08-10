import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SpectatorForm from './components/spectator_form.js';
import PaymentSuccess from './components/payment_success.js'
import MeetForm from './components/meet_director_form.js';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<SpectatorForm/>} />
                <Route exact path="/success" element={<PaymentSuccess/>} />
                <Route exact path="/meet-creation-form" element={<MeetForm/>} />
            </Routes>
        </Router>
    );
}

export default App;
