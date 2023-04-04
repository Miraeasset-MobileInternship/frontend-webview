import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import StockSellingCheckTypes from "../../../types/StockSellingCheckTypes";
import sellingStockService from "../../../services/sellingStockService";


interface Props {
    price:number;
    changePrice:number;
    changePercent:number;
    currency:string;
    sellAvailable:boolean;
}


export default function MainCardView({currency,price,changePrice,changePercent,sellAvailable}:Props) {
    const params = useParams();
    const symbol:string = params.stockId as string;

    const navigate = useNavigate();


    const navigateToBuy = () => {
        navigate("/"+symbol+"/buy");
    }

    const navigateToSell = () => {
        navigate("/"+symbol+"/sell");
    }



    return (
        <Card sx={{ minWidth: 150, height:'100%'}} style={{boxShadow: "0px 0px 5px 1px rgba(103, 105, 106, 0.25)", borderRadius: 12}}>
            <CardContent sx={{height:'100%', padding:0.5, }}>
                <div style={{height: '15%', padding: 1, display:"flex", alignItems:'center'}}>
                    <TitleText style={{paddingLeft:7}}>{"오늘 주가"}</TitleText>
                </div>
                <div style={{height: '30%', display:"flex", alignItems:'center',}}>
                    <Typography variant="h5" component="div" style={{paddingLeft:7}}>
                        <MainText>{price}</MainText>
                        {changePrice > 0 ? (
                            <>
                                <DefaultText style={{color: "#D06464"}}>{"+"}{changePrice}{currency}{"  "}</DefaultText>
                                <DefaultText style={{color: "#D06464"}}>{"("}{changePercent}{"%)"}</DefaultText>
                            </>
                        )
                            :
                        (
                            <>
                                <DefaultText style={{color: "#5787DE"}}>{changePrice}{currency}{"  "}</DefaultText>
                                <DefaultText style={{color: "#5787DE"}}>{"("}{changePercent}{"%)"}</DefaultText>
                            </>
                        )
                        }
                    </Typography>
                </div>
                <div style={{display: "flex", flexDirection: 'row',
                    padding:7, height: '35%'}}>
                    <CustomBtn style={{backgroundColor: "#FEF8F8"}} onClick={navigateToBuy}>
                        <ButtonText style={{color: "#D06464"}}>{"매수하기"}</ButtonText>
                    </CustomBtn>
                    <div style={{padding:5}}/>
                    {sellAvailable ?
                        (
                            <CustomBtn style={{backgroundColor: "#EEF2FC"}} onClick={navigateToSell}>
                                <ButtonText style={{color: "#5787DE"}}>{"매도하기"}</ButtonText>
                            </CustomBtn>
                        )
                        :
                            (
                                <CustomBtn style={{backgroundColor: "#999999"}} >
                                    <ButtonText style={{color: "#FFFFFF"}}>{"매도하기"}</ButtonText>
                                </CustomBtn>
                            )
                    }
                </div>
            </CardContent>
        </Card>
    );
}

const DefaultText = styled.text`

    //height: 100vh;
  
    font-size: 0.6em;

    font-family: Pretendard;
    font-weight: 400;
  
    letter-spacing: 0.20000000298023224px;
    text-align: center;

`;

const MainText = styled.text`
  

    font-size: 1em;

    font-family: Pretendard;
    font-weight: 800;
`;



const TitleText = styled.text`
  
    color : #67696A;

    font-size: 0.8rem;

    font-family: Pretendard;
    font-weight: 600;
`;


const CustomBtn = styled.div`
  
    height: 100%;
    border-radius: 12px;
    flex:1;
  
    display: flex;
    align-items: center; 
    justify-content: center;
`;


const ButtonText = styled.text`
  
    font-size: 1.2em;

    font-family: Pretendard;
    font-weight: 500;
    letter-spacing: 2px;
`;
