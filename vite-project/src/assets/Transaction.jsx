import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import axios from 'axios';

function Transaction() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [fromUserId, setFromUserId] = useState('');
    const [toUserId, setToUserId] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://refactor-api-fikq.onrender.com/api/users');
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleFilter = (value) => {
        setFilterValue(value);
        const filtered = users.filter(user => user.cash.toString().includes(value));
        setFilteredUsers(filtered);
    };

    const handleTransfer = async () => {
        try {
            const response = await axios.put(
                `https://refactor-api-fikq.onrender.com/api/users/${fromUserId}/transfer/${toUserId}`,
                {
                    cash: parseFloat(transferAmount),
                }
            );

            if (response.status === 200) {
                setSuccessMessage(true);
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Error transferring amount:', error);
        }
    };

    return (
        <Container style={{ padding: '20px', marginTop: '80px' }}>
            <Typography style={{color:"#007bff"}} variant="h4" gutterBottom>
                User List
            </Typography>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <TextField
                    label="Filter by Cash"
                    value={filterValue}
                    onChange={(e) => handleFilter(e.target.value)}
                    variant="outlined"
                    style={{ marginRight: '10px', flex: 1 }}
                />
                <TextField
                    label="From User ID"
                    value={fromUserId}
                    onChange={(e) => setFromUserId(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="To User ID"
                    value={toUserId}
                    onChange={(e) => setToUserId(e.target.value)}
                />
            </div>
            <TextField
                label="Transfer Amount"
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
            />
            <Button variant="contained" onClick={handleTransfer} style={{ marginBottom: '20px' }}>
                Transfer
            </Button>
            {successMessage && (
                <Typography variant="body1" style={{ color: 'green', marginTop: '10px' }}>
                    Transfer successful!
                </Typography>
            )}
            <List>
                {filteredUsers.map(user => (
                    <ListItem key={user._id} style={{ border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' }}>
                        <ListItemText
                            primary={`Name: ${user.name}`}
                            secondary={`Cash: ${user.cash}, Email: ${user.email}`}
                        />
                    </ListItem>
                ))}
            </List>
            <Link to='/' style={{ display: 'block', marginTop: '20px' }}>
                Back
            </Link>
        </Container>
    );
}

export default Transaction;
