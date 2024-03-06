import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Typography, List, ListItem, ListItemText } from '@mui/material';


const HomeList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/home_page/');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
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
                 <ListItem key={index} divider>
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