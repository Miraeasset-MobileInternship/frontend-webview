import * as React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styled from "styled-components";

export default function NotExistPage() {

    return (
        <div style={{height:'100vh',display:'flex',flexDirection:'column',
            alignItems:'center',justifyContent:'center',}}>
            <ErrorOutlineIcon color="action" sx={{textAlign:'center', fontSize: '100px', padding:2}}/>
            <TitleText>{"존재하지 않거나 지원하지 않는 종목에 대한 접근입니다."}</TitleText>
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
