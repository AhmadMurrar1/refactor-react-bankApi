import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import Header from './Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserDetails() {
    const [user, setUser] = useState(null);
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`https://refactor-api-fikq.onrender.com/api/users/${userId}`);
                const userData = response.data;
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchUserDetails();
        }
    }, [userId]);

    const handleDeposit = async () => {
        try {
            const response = await axios.put(`https://refactor-api-fikq.onrender.com/api/users/${userId}/deposit`, {
                cash: parseFloat(depositAmount),
            });
            const updatedUserData = response.data.user;
            setUser(updatedUserData);
            setDepositAmount('');
        } catch (error) {
            console.error('Error depositing amount:', error);
        }
    };

    const handleWithdraw = async () => {
        try {
            const response = await axios.put(`https://refactor-api-fikq.onrender.com/api/users/${userId}/withdraw`, {
                cash: parseFloat(withdrawAmount),
            });
            const updatedUserData = response.data.user;
            setUser(updatedUserData);
            setWithdrawAmount('');
        } catch (error) {
            console.error('Error withdrawing amount:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Container style={{ flex: 1, padding: '20px', marginTop: '20px' }}>
                {user ? (
                    <div style={{ marginTop: '20px' }}>
                        <Typography variant="h4" gutterBottom style={{ color: '#007bff', marginBottom: '20px' }}>
                            User Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    ID: {user._id}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Name: {user.name}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Email: {user.email}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Created At: {new Date(user.createdAt).toLocaleString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Cash: {user.cash}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Updated At: {new Date(user.updatedAt).toLocaleString()}
                                </Typography>
                            </Grid>
                        </Grid>
                        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                            <TextField
                                label="Deposit Amount"
                                type="number"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                style={{ marginRight: '10px' }}
                            />
                            <Button variant="contained" onClick={handleDeposit}>
                                Deposit
                            </Button>
                        </div>
                        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                            <TextField
                                label="Withdraw Amount"
                                type="number"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                style={{ marginRight: '10px' }}
                            />
                            <Button variant="contained" onClick={handleWithdraw}>
                                Withdraw
                            </Button>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <Link to={`/${userId}`} style={{ marginRight: '20px' }}>
                                Edit
                            </Link>
                            <Link to='/'>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p>Loading user details...</p>
                )}
            </Container>
        </div>
    );
}

export default UserDetails;
