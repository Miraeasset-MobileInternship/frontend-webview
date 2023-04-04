import * as React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";

export default function StockSuccessPage() {
    const params = useParams();
    const symbol:string = params.stockId as string;
    const navigate = useNavigate();


    const navigateToMain = () => {
        navigate("/"+symbol);
    }


    return (

    <div className="stock-container">
        <div className="title-area">
            <TitleText>{"매수/매도하기"}</TitleText>
        </div>
        <div className="main-view-area">
            <div style={{height:'100%',display:'flex',flexDirection:'column',
                alignItems:'center',justifyContent:'center',}}>
                <CheckCircleOutlineIcon color="action" sx={{textAlign:'center', fontSize: '100px', padding:2, color: '#F58220'}}/>
                <MessageText>{"거래가 성공적으로 완료되었습니다."}</MessageText>
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
