import * as React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styled from "styled-components";

export default function ErrorView() {

    return (
        <div style={{height:'100%',display:'flex',flexDirection:'column',
            alignItems:'center',justifyContent:'center'}}>
            <ErrorOutlineIcon color="action" sx={{textAlign:'center', fontSize: '85px', padding:2}}/>
            <ErrorText>{"요청한 작업에서 에러가 발생하였습니다."}</ErrorText>
        </div>
    );
}

const ErrorText = styled.text`


  font-size: 16px;

  color: #A3A5A7;
  text-align: center;
  font-family: Pretendard;
  font-weight: 400;

`;

