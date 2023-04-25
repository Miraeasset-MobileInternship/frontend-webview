import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import {replace} from "lodash";

export default function Header() {
    const navigate = useNavigate();

    const handleHistory = () => {
        navigate(-1)
    }


    return (
        <Box sx={{ color: '#999999',display: 'flex', height:'30px',width:'100%',alignItems:'center', padding:1 }}>
            <ArrowBackIcon onClick={handleHistory}/>
        </Box>
    );
}