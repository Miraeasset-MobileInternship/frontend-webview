import * as React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styled from "styled-components";

export default function ErrorPage() {

    return (
        <div style={{height:'100vh',display:'flex',flexDirection:'column',
            alignItems:'center',justifyContent:'center',}}>
            <ErrorOutlineIcon color="action" sx={{textAlign:'center', fontSize: '100px', padding:2}}/>
            <TitleText>{"요청한 작업에서 에러가 발생하였습니다."}</TitleText>
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
