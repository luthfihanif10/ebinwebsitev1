import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Box, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { DeleteOutline, ErrorOutline, LocationOnOutlined, NavigateBefore, ThumbUpAltOutlined } from "@mui/icons-material";
import { useParams } from 'react-router-dom';
import {MapContainer, Popup, Marker, TileLayer} from 'react-leaflet'

function Details () {
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
                    <a href={'/'}>
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
                        <Grid item xs={6}>
                        <MapContainer center={[trashStation.location.latitude, trashStation.location.longitude]} zoom={15} scrollWheelZoom={false} style={{height: '100vh'}}>
                            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[trashStation.location.latitude, trashStation.location.longitude]}>
                                <Popup>
                                    Trash station {trashStation.id}
                                </Popup>
                            </Marker>
                        </MapContainer>
                        </Grid>
                        <Grid item xs={6} sx={{ padding: 2 }}>
                            <Typography variant="h3" component="h1" sx={{ fontSize: 36, color: '#424940', marginTop: 3, marginBottom: 3 }}>
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
                                <a href={`/details/${trashStation.id}/transaction`}>
                                    <Typography variant="body1" component="p" sx={{ fontSize: '18px', color: '#000000', textAlign: 'center' }}>
                                        Transaction on Trash Station
                                    </Typography>
                                </a>
                                
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

export default Details;