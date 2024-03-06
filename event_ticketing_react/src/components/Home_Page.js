import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

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
            <h1>Meet List</h1>
            <ul>
                {data.map(item => (
                    <li><b>{item.meet_name}</b> - {format(new Date(item.meet_date), 'MMMM d, yyyy')}</li>
                ))}
            </ul>
        </div>
    );
};

export default HomeList;