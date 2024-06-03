import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Typography, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomeList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/home_page/');
                console.log(response.data);  // Check the structure here

                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">Error fetching data. Please try again later.</Alert>;
    }

    if (data.length === 0) {
        return <Typography variant="h6">No meets available at the moment.</Typography>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom component="h1">
                Meet List
            </Typography>
            <List>
                {data.map((item) => (
                    <ListItem
                        key={item.id}
                        component={RouterLink}
                        to={`/spectator/${item.id}`} // Updated to the correct path
                        divider
                    >
                        <ListItemText
                            primary={item.meet_name}
                            secondary={format(new Date(item.meet_date), 'MMMM d, yyyy')}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default HomeList;
