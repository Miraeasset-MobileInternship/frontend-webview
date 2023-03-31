import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
    return (
        <Box sx={{ color:'orange', display: 'flex', height:'100%',alignItems:'center', justifyContent:'center' }}>
            <CircularProgress color="inherit"/>
        </Box>
    );
}