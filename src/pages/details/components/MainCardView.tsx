import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from "styled-components";


interface Props {
    price:number;
    changePrice:number;
    changePercent:number;
    currency:string;
}


export default function MainCardView({currency,price,changePrice,changePercent}:Props) {
    return (
        <Card sx={{ minWidth: 150, maxHeight: '100%' }} style={{  boxShadow: "0px 0px 5px 1px rgba(103, 105, 106, 0.25)", borderRadius: 12,}}>
            <CardContent sx={{paddingTop:1, paddingBottom:1, paddingLeft:1.5}}>
                <Typography >
                    <TitleText>{"오늘 주가"}</TitleText>
                </Typography>
                <Typography variant="h5" component="div">
                    <MainText>{price}</MainText>
                </Typography>
                <Typography sx={{ mb: 2 }} >
                    {changePrice>0 ? (
                        <>
                            <DefaultText style={{color: "#D06464"}}>{"+"}{changePrice}{currency}{"  "}</DefaultText>
                            <DefaultText style={{color: "#D06464"}}>{"("}{changePercent}{"%)"}</DefaultText>
                        </>
                    )
                        :
                    (
                        <>
                            <DefaultText style={{color: "#5787DE"}}>{"-"}{changePrice}{currency}{"  "}</DefaultText>
                            <DefaultText style={{color: "#5787DE"}}>{"("}{changePercent}{"%)"}</DefaultText>
                        </>
                    )
                    }

                </Typography>
            </CardContent>
        </Card>
    );
}

const DefaultText = styled.text`

    //height: 100vh;
  
    font-size: 1rem;

    font-family: Pretendard;
    font-weight: 400;
  
    letter-spacing: 0.20000000298023224px;
    text-align: center;

`;

const MainText = styled.text`
  

    font-size: 1.5rem;

    font-family: Pretendard;
    font-weight: 800;
`;



const TitleText = styled.text`
  
    color : #67696A;

    font-size: 0.8rem;

    font-family: Pretendard;
    font-weight: 600;
`;
