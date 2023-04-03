import * as React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styled from "styled-components";

export default function SuccessPage() {

    return (
        <div style={{height:'100vh',display:'flex',flexDirection:'column',
            alignItems:'center',justifyContent:'center',}}>
            <ErrorOutlineIcon color="action" sx={{textAlign:'center', fontSize: '100px', padding:2}}/>
            <TitleText>{"성공!"}</TitleText>
        </div>
    );
}

const TitleText = styled.text`
  
    font-size: 20px;

    color: #A3A5A7;
    text-align: center;
    font-family: Pretendard;
    font-weight: 400;
`;
