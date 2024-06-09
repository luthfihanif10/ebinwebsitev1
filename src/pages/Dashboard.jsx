import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, InputAdornment, IconButton, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { ErrorOutline } from '@mui/icons-material';
import { DeleteOutline } from '@mui/icons-material';
import {MapContainer, Popup, Marker, TileLayer} from 'react-leaflet'

const Dashboard = () => {
    const [trashStations, setTrashStations] = useState([]);
    const [filteredTrashStations, setFilteredTrashStations] = useState([]);

    useEffect(() => {
        axios. get('https://ebin-api.onrender.com/trash-stations')
            .then(result => {
                console.log('Fetched data: ', result.data);
                setTrashStations(result.data);
                setFilteredTrashStations(result.data)
            })
            .catch(err => {
                console.error('Error fetching data: ', err);
            });
    }, []);

    const handleSearch = (value) => {
        if(value !== '') {
            const filter = trashStations.filter(trashStation => value.toLowerCase().includes(trashStation.id.toLowerCase()))
            setFilteredTrashStations(filter)
        } else {
            setFilteredTrashStations(trashStations)
        }
        
    }

    return (
        <div>
        <Grid container>
            <Grid item xs={4}>
                <Box
                    sx={{
                        height: '100vh',
                        backgroundColor: '#F1F5EC',
                        borderRadius: '0 15px 15px 0', // Rounded corner on right side
                        overflowY: 'auto', // Enable scrolling if content overflows
                        padding: '1rem', // Add padding for content
                        boxShadow: '0 5px 25px rgba(0, 0, 0, 0.16)', // Add shadow
                        boxSizing: 'border-box'
                }}
                >

                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            display: 'flex',
                            fontSize: '48px',
                            fontWeight: 600,
                            color: '#37693D',
                            textAlign: 'center',
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: 'auto',
                            marginTop: 3,
                            marginBottom: 3
                        }}
                    >
                        eBin
                    </Typography>

                    <TextField
                        label=""
                        variant="outlined" // Use outlined style
                        fullWidth // Take full width of container
                        placeholder="Search trash station"
                        InputProps={{
                        sx: {
                            height: '56px',
                            borderRadius: '28px', // Rounded corners
                            backgroundColor: '#E5E9E1', // Background color
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        }}
                        onChange={(e) => handleSearch(e.target.value)}
                    />

                    <Typography
                        variant="body2"
                        component="p"
                        sx={{
                        fontFamily: 'Roboto',
                        fontSize: '20px',
                        fontWeight: 'Bold',
                        textAlign: 'left',
                        alignItems: 'center',
                        width: '100%',
                        marginTop: 3,
                        marginBottom: 2
                        }}
                    >
                        Alerts
                    </Typography>

                    {filteredTrashStations.length === 0 ? (
                        <Typography>No data available</Typography>
                    ) : (
                        filteredTrashStations.map((trashStation) => {
                            if (trashStation.available === false) {
                                return (
                                    <Box
                                        key={trashStation.id}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            height: '65px',
                                            backgroundColor: '#F7FBF2',
                                            borderRadius: '20px',
                                            padding: '1rem', // Add padding
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)', // Subtle shadow
                                            marginBottom: 2
                                        }}
                                    >      

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 40,
                                                height: 40,
                                                backgroundColor: '#FFC9C9',
                                                borderRadius: '50%',
                                            }}
                                        >
                                            <ErrorOutline sx={{ width: 24, height: 24, color: '#C92A2A' }} />
                                        </Box>

                                        <div>
                                            <Typography variant="body1" component="p" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                                                Trash Station {trashStation.id}
                                            </Typography>

                                            <Typography variant="body2" component="p" sx={{ fontSize: '16px' }}>
                                                Need Maintenance
                                            </Typography>
                                        </div>

                                        <a href={`/details/${trashStation.id}`}>
                                            <IconButton>
                                                <ArrowRightIcon />
                                            </IconButton>
                                        </a> 
                                    </Box>                                                         
                                );
                            } else if (trashStation.available === true && trashStation.capacity === 100) {
                                return (
                                    <Box
                                        key={trashStation.id}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            height: '65px',
                                            backgroundColor: '#F7FBF2',
                                            borderRadius: '20px',
                                            padding: '1rem', // Add padding
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)', // Subtle shadow
                                            marginBottom: 2
                                        }}
                                    >      

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 40,
                                                height: 40,
                                                backgroundColor: '#FFE066',
                                                borderRadius: '50%',
                                            }}
                                        >
                                            <DeleteOutline sx={{ width: 24, height: 24, color: '#E67700' }} />
                                        </Box>

                                        <div>
                                            <Typography variant="body1" component="p" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                                                Trash Station {trashStation.id}
                                            </Typography>

                                            <Typography variant="body2" component="p" sx={{ fontSize: '16px' }}>
                                                Empty the trash
                                            </Typography>
                                        </div>

                                        <a href={`/details/${trashStation.id}`}>
                                            <IconButton>
                                                <ArrowRightIcon />
                                            </IconButton>
                                        </a> 
                                        

                                    </Box> 
                                );
                            } else {
                                return null;
                            }
                        })
                    )}

                    <Divider
                        variant="middle"
                        sx={{ margin: '0 auto', marginTop: 3, borderBottom: '1px solid #C1C9BE' }} // Adjust border style
                    />

                    <Typography
                        variant="body2"
                        component="p"
                        sx={{
                        fontFamily: 'Roboto',
                        fontSize: '20px',
                        fontWeight: 'Bold',
                        textAlign: 'left',
                        alignItems: 'center',
                        width: '100%',
                        marginTop: 3,
                        marginBottom: 2
                        }}
                    >
                        All Trash Stations
                    </Typography>

                    {filteredTrashStations.length === 0 ? (
                        <Typography>No data available</Typography>
                    ) : (
                        filteredTrashStations.map((trashStation) => {
                            if (trashStation.available === true && trashStation.capacity < 100) {
                                return (
                                    <Box
                                        key={trashStation.id}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            height: '65px',
                                            backgroundColor: '#F7FBF2',
                                            borderRadius: '20px',
                                            padding: '1rem', // Add padding
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)', // Subtle shadow
                                            marginBottom: 2
                                        }}
                                    >      

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 40,
                                                height: 40,
                                                backgroundColor: '#B8F1B9',
                                                borderRadius: '50%',
                                            }}
                                        >
                                            <Typography variant="body1" component="span" sx={{ fontWeight:'Bold', color: '#000' }}>
                                                {trashStation.id}
                                            </Typography>
                                        </Box>

                                        <div>
                                            <Typography variant="body1" component="p" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                                                Trash Station {trashStation.id}
                                            </Typography>

                                            <Typography variant="body2" component="p" sx={{ fontSize: '16px' }}>
                                                {trashStation.capacity}% Capacity
                                            </Typography>
                                        </div>

                                        <a href={`/details/${trashStation.id}`}>
                                            <IconButton>
                                                <ArrowRightIcon />
                                            </IconButton>
                                        </a>    

                                    </Box>                                                         
                                );
                            } else {
                                return null;
                            }
                        })
                    )}


                </Box>
            </Grid>
            <Grid item xs={8}>
                <MapContainer center={[-6.89329641160456, 107.61119012530456]} zoom={15} scrollWheelZoom={false} style={{height: '100vh'}}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {filteredTrashStations.map(trashStation => (
                    <Marker position={[trashStation.location.latitude, trashStation.location.longitude]}>
                        <Popup>
                            <a href={`/details/${trashStation.id}`}>
                                Trash station {trashStation.id}
                            </a>
                        </Popup>
                    </Marker>
                    ))}
                </MapContainer>
            </Grid>
        </Grid> 
        </div>
        
    )
};

export default Dashboard;