import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Box, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { AccountCircle, ArrowRight, DeleteOutline, ErrorOutline, LocationOnOutlined, NavigateBefore, ThumbUpAltOutlined } from "@mui/icons-material";
import { useParams } from 'react-router-dom';

const Transaction = () => {
    const [trashStation, setTrashStation] = useState(null);
    const [error, setError] = useState(null);
    const {id} = useParams()

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`https://ebin-api.onrender.com/trash-stations/${id}`);
            setTrashStation(response.data);
        } catch (error) {
            setError(error);
        }
        };

        fetchData();
    }, []);

    
    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: '#EEF2E9' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', height: 90 }}>
                    <a href={`/details/${trashStation?.id}`}>
                        <IconButton>
                            <NavigateBefore sx={{ width: '32px', height: '32px', color: '#000000' }}/>
                        </IconButton>
                    </a>
                    

                    <Typography variant="h3" component="h1" sx={{ fontSize: 48, color: '#37693D', fontWeight: 'bold' }}>
                        eBin
                    </Typography>
                </Toolbar>
            </AppBar>
            
            {error ? (
                <p style={{ color: 'red' }}>Error: {error.message}</p>
            ) : trashStation ? (
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sx={{ padding: 2 }}>
                            <Box fullWidth sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '10px', marginY: 3, paddingX: 2 }}>
                            <Typography variant="h3" component="h1" sx={{ fontSize: 36, color: '#424940', marginTop: 2, marginBottom: 2 }}>
                                Trash Station {trashStation.id}
                            </Typography>

                            {trashStation.available === true && trashStation.capacity < 100 ? (
                                <Box fullWidth sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center',height: 40, backgroundColor: '#BDEAF3', borderRadius: '20px' ,marginTop: 2, padding: 2 }}>
                                    <ThumbUpAltOutlined sx={{ width: 24, height: 24, color: '#2FAAC3' }} />
                                    <Typography variant="body1" sx={{ fontSize: '20px' , color: '#000000', padding: 1 }}>
                                        Trash station is functioning normally
                                    </Typography>
                                </Box>
                            ) : trashStation.available === true && trashStation.capacity === 100 ? (
                                <Box fullWidth sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center',height: 40, backgroundColor: '#FFE066', borderRadius: '20px' ,marginTop: 2, padding: 2 }}>
                                    <DeleteOutline sx={{ width: 24, height: 24, color: '#E67700' }} />
                                    <Typography variant="body1" sx={{ fontSize: '20px' , color: '#000000', padding: 1 }}>
                                        Trash station is full of trash, please empty it
                                    </Typography>
                                </Box>
                            ) : trashStation.available === false ? (
                                <Box fullWidth sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center',height: 40, backgroundColor: '#FFC9C9', borderRadius: '20px' ,marginTop: 2, padding: 2 }}>
                                    <ErrorOutline sx={{ width: 24, height: 24, color: '#C92A2A' }} />
                                    <Typography variant="body1" sx={{ fontSize: '20px' , color: '#000000', padding: 1 }}>
                                        Trash station need maintenance
                                    </Typography>
                                </Box>
                            ) : (
                                null
                            )}
                            
                            <Box fullWidth sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center',height: 40, borderRadius: '20px' ,marginTop: 3, padding: 2 }}>
                                <LocationOnOutlined sx={{ width: 24, height: 24 }} />
                                <div>
                                    <Typography variant="body1" component="p" sx={{ fontSize: '25px' , color: '#000000', marginLeft: 2 }}>
                                        Address
                                    </Typography>
                                    <Typography variant="body1" component="p" sx={{ fontSize: '20px' , color: '#000000', marginLeft: 2 }}>
                                        {trashStation.address}
                                    </Typography>
                                </div>
                            </Box>

                            <Box fullWidth sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center',height: 40, borderRadius: '20px' ,marginTop: 3, padding: 2 }}>
                                <DeleteOutline sx={{ width: 24, height: 24 }} />
                                <div>
                                    <Typography variant="body1" component="p" sx={{ fontSize: '25px' , color: '#000000', marginLeft: 2 }}>
                                        Capacity
                                    </Typography>
                                    <Typography variant="body1" component="p" sx={{ fontSize: '20px' , color: '#000000', marginLeft: 2 }}>
                                        {trashStation.capacity}% Capacity
                                    </Typography>
                                </div>
                            </Box>

                            <Box fullWidth sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250, borderRadius: '10px', marginTop: 3, padding: 2, border: '1px solid black' }}>
                                <Typography variant="body1" component="p" sx={{ fontSize: '18px', color: '#000000', textAlign: 'center' }}>
                                    Transaction on Trash Station
                                </Typography>
                            </Box>
                            </Box>
                            
                        </Grid>

                        <Grid item xs={6} sx={{ padding: 2 }}>
                            <Box fullWidth sx={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#D4E8D0', borderRadius: '10px', marginY: 3, paddingX: 5, paddingY: 2 }}>
                                
                                <Typography variant="body1" component="p" sx={{ fontSize: '20px', marginBottom: 2, color: '#000000' }}>
                                    Latest Transaction
                                </Typography>

                                {trashStation.transaction && trashStation.transaction.map((transaction) => (
                                    <Box 
                                        fullWidth 
                                        sx={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            width: '100%',
                                            height: '65px', 
                                            backgroundColor: '#F7FBF2', 
                                            borderRadius: '20px',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)',
                                            marginBottom: 2
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={2}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: 40,
                                                        height: 40,
                                                        backgroundColor: '#B8F1B9',
                                                        borderRadius: '50%',
                                                        marginLeft: 2,
                                                    }}
                                                >
                                                    <AccountCircle sx={{ width: 24, height: 24, color: '#37693D' }} />
                                                </Box>
                                            </Grid>

                                            <Grid item xs={8}>
                                                <div>
                                                    <Typography variant="body1" component="p" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                                        {transaction.user}
                                                    </Typography>

                                                    <Typography variant="body2" component="p" sx={{ fontSize: '14px' }}>
                                                        {transaction.reward}
                                                    </Typography>
                                                </div>                                                                                                
                                            </Grid>

                                            <Grid item xs={2}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-end',
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: '50%',
                                                    }}
                                                >
                                                    <ArrowRight sx={{ width: 24, height: 24, color: '#37693D' }} />
                                                </Box>                                                                                                
                                            </Grid>

                                        </Grid>                             
                                    </Box>
                                ))}

                                
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            ) : (
                null
            )}

        </div>
        
    )
}

export default Transaction;