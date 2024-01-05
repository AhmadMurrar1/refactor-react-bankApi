import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Grid, Typography, Link } from '@mui/material';
import axios from 'axios';
import { useParams, Link as RouterLink } from 'react-router-dom';

function EditUser() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);

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

        fetchUserDetails();
    }, [userId]);

    const handleUpdate = async () => {
        try {
            await axios.put(`https://refactor-api-fikq.onrender.com/api/users/${userId}`, user);
            setSuccessMessage(true);
            setTimeout(() => {
                setSuccessMessage(false);
            }, 3000);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    if (!user) {
        return <p>Loading user details...</p>;
    }

    return (
        <Container className='edit-user' style={{ marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Edit User
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        fullWidth
                        style={{ marginBottom: '20px' }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        fullWidth
                        style={{ marginBottom: '20px' }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Cash"
                        name="cash"
                        type="number"
                        value={user.cash}
                        onChange={handleChange}
                        fullWidth
                        style={{ marginBottom: '20px' }}
                    />
                </Grid>
            </Grid>
            {successMessage && (
                <Typography style={{ color: 'green', marginTop: '10px' }}>
                    Updated successfully!
                </Typography>
            )}
            <Button variant="contained" onClick={handleUpdate}>
                Update
            </Button>
            <Link component={RouterLink} to="/" style={{ marginLeft: '10px' }}>
                Back
            </Link>
        </Container>
    );
}

export default EditUser;
