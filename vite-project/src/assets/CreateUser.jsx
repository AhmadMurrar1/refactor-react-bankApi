import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CreateUser() {
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserCash, setNewUserCash] = useState('');
    const [userCreated, setUserCreated] = useState(false);

    const handleCreateUser = async () => {
        try {
            const response = await axios.post('https://refactor-api-fikq.onrender.com/api/users', {
                name: newUserName,
                email: newUserEmail,
                cash: newUserCash,
            });
            const newUser = response.data;

            setUserCreated(true);
            setTimeout(() => {
                setUserCreated(false);
            }, 4000); 
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <Container className='create-user' style={{ marginTop: '20px' }}>
            <div style={{ textAlign: 'center' }}>
                <Typography style={{color:"#007bff"}} variant="h5" gutterBottom>Create New User</Typography>
                <TextField
                    label="Name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    fullWidth
                    style={{ marginBottom: '20px' }}
                />
                <TextField
                    label="Email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    fullWidth
                    style={{ marginBottom: '20px' }}
                />
                <TextField
                    label="Cash"
                    value={newUserCash}
                    onChange={(e) => setNewUserCash(e.target.value)}
                    fullWidth
                    style={{ marginBottom: '20px' }}
                />
                <Button variant="contained" onClick={handleCreateUser}>
                    Create
                </Button>
                {userCreated && (
                    <Typography variant="body1" style={{ color: 'green', marginTop: '10px' }}>
                        User created successfully!
                    </Typography>
                )}
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
                        Back to Home
                    </Link>
                </Typography>
            </div>
        </Container>
    );
}

export default CreateUser;
