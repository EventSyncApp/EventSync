import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SpectatorForm from './components/spectator_form.js';
import PaymentSuccess from './components/payment_success.js';
import MeetForm from './components/meet_director_form.js';
import SpectatorsTable from './components/SpectatorsTable';
import AllSpectatorsTable from './components/AllSpectatorsTable';  // Import the new component
import HomeList from './components/Home_Page.js';import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomeList/>} />

                <Route exact path="/success" element={<PaymentSuccess/>} />
                <Route exact path="/spectator" element={<SpectatorForm />} />
                <Route exact path="/meet-creation-form" element={<MeetForm/>} />
            //    <Route exact path="/spectator-list" element={<spectatorList/>} />
                <Route exact path="/spectator/:id" element={<SpectatorForm />} />
                <Route exact path="/spectator-list/:meetId" element={<SpectatorsTable />} />  {/* Dynamic meet ID */}
                <Route exact path="/all-spectators" element={<AllSpectatorsTable />} />  {/* Add this line */}
            </Routes>
        </Router>
    );
}

export default App;
