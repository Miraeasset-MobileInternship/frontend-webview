import * as React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styled from "styled-components";

export default function NotSupportView() {

    return (
        <div style={{height:'100%',display:'flex',flexDirection:'column',
            alignItems:'center',justifyContent:'center',}}>
            <MoreHorizIcon color="action" sx={{textAlign:'center', fontSize: '40px', padding:2}}/>
            <ErrorText>{"해당 종목에서는 제공하지 않는 기능입니다."}</ErrorText>
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

