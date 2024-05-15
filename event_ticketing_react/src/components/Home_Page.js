import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';



const HomeList = () => {
    const [data, setData] = useState([]);
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
            }
        };

        fetchData();
    }, []);

    return (
        <div>
             <Typography variant="h4" gutterBottom component="h1">
               Meet List
             </Typography>
             <List>
               {data.map((item, index) => (
                <ListItem
                key={item.id}
                component={RouterLink}
                to={`/signup/${item.id}`}
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