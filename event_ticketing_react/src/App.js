import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import SpectatorForm from './components/spectator_form.js';
import PaymentSuccess from './components/PaymentSuccess.js';
import MeetForm from './components/meet_director_form.js';
import SpectatorsTable from './components/SpectatorsTable';
import AllSpectatorsTable from './components/AllSpectatorsTable';
import HomeList from './components/Home_Page.js';
import InfoLinks from './components/InfoLinks';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import './App.css';

function App() {
    return (
        <Router>
            <Box>
                <InfoLinks />
                <Box mt={8} p={2}>
                    <Routes>
                        <Route exact path="/" element={<HomeList/>} />
                        <Route exact path="/success" element={<PaymentSuccess/>} />
                        <Route exact path="/spectator" element={<SpectatorForm />} />
                        <Route exact path="/meet-creation-form" element={<MeetForm/>} />
                        {/* <Route exact path="/spectator-list" element={<spectatorList/>} /> */}
                        <Route exact path="/spectator/:id" element={<SpectatorForm />} />
                        <Route exact path="/spectator-list/:meetId" element={<SpectatorsTable />} />
                        <Route exact path="/all-spectators" element={<AllSpectatorsTable />} />
                        <Route exact path="/contact" element={<Contact />} />
                        <Route exact path="/faq" element={<FAQ />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;
