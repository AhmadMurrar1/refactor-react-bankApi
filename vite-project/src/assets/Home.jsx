import React, { useState, useEffect } from 'react';
import { Container, Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://refactor-api-fikq.onrender.com/api/users');
                const data = response.data;
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <Container sx={{ paddingTop: '80px', paddingBottom: '20px' }}>
                {users.map(user => (
                    <Card key={user._id} sx={{ marginBottom: '20px' }}>
                        <CardContent>
                            <Typography variant='h6'>{user.name}</Typography>
                            <Typography variant='body1'>Email: {user.email}</Typography>
                            <Link style={{textDecoration:"underline",color:"gray"}} to={`/user-details/${user._id}`}> user details</Link>
                        </CardContent>
                    </Card>
                ))}
                <Button variant='contained' sx={{ marginTop: '20px' }}>
                    <Link style={{color:"white"}} to='/create-user'>Create user</Link>
                </Button>
            </Container>
        </>
    );
}

export default Home;
