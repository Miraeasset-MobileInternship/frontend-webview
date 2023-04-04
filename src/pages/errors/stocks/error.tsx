import * as React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

export default function StockErrorPage() {
    const navigate = useNavigate();


    const navigateToMain = () => {
        navigate("/");
    }


    return (

        <div className="stock-container">
            <div className="title-area">
                <TitleText>{"매수/매도하기"}</TitleText>
            </div>
            <div className="main-view-area">
                <div style={{height:'100%',display:'flex',flexDirection:'column',
                    alignItems:'center',justifyContent:'center',}}>
                    <ErrorOutlineIcon color="action" sx={{textAlign:'center', fontSize: '100px', padding:2}}/>
                    <MessageText>{"거래 과정에서 에러가 발생하였습니다."}</MessageText>
                </div>
            </div>
            <div className="btn-area">
                <CustomBtn onClick={navigateToMain}>
                    <ButtonText>{"돌아가기"}</ButtonText>
                </CustomBtn>
            </div>
        </div>
    );
}

const TitleText = styled.text`

  

    font-size: 25px;

    font-family: Pretendard;
    font-weight: 700;
`;


const MessageText = styled.text`
  
    font-size: 20px;

    color: #A3A5A7;
    text-align: center;
    font-family: Pretendard;
    font-weight: 400;
`;

const CustomBtn = styled.div`
  
    height: 65%;
    border-radius: 12px;
    flex:1;
  
    background-color: #F58220;
  
    display: flex;
    align-items: center; 
    justify-content: center;
  
  
`;


const ButtonText = styled.text`
  
    font-size: 1.2em;
    color:white;
    font-family: Pretendard;
    font-weight: 500;
    letter-spacing: 2px;
`;
