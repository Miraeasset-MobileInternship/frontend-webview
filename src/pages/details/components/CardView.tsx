import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";


interface Props {
    symbol:string;
    title:string;
    price:number;
    changePrice:number;
    changePercent:number;

}


export default function CardView({symbol,title,price,changePrice,changePercent}:Props) {
    const navigate = useNavigate();

    const navigateToDetail = () => {
        navigate("/"+symbol);
        window.location.reload() //새로 고침해야 정보가 변환됨
    }


    return (
        <div onClick={navigateToDetail}>
            <Card sx={{ minWidth: 160, maxHeight: 120 }} style={{  boxShadow: "0px 0px 5px 1px rgba(103, 105, 106, 0.25)", borderRadius: 12,}}>
                <CardContent sx={{paddingTop:1, paddingBottom:1, paddingLeft:1.5}}>
                    {
                        title.length>=20 ?
                            (
                                <>
                                    <Typography color="text.primary" >
                                        <TitleText style={{fontSize:12,flexWrap:'wrap',wordWrap: 'break-word'}}>{title}</TitleText>
                                    </Typography>

                                </>
                            )
                            :
                                (
                                    <>
                                        <Typography color="text.primary" >
                                            <TitleText style={{flexWrap:'wrap',wordWrap: 'break-word'}}>{title}</TitleText>
                                        </Typography>
                                    </>
                                )
                    }
                        <Typography variant="h5" component="div">
                            <MainText>{price}</MainText>
                        </Typography>
                        <Typography sx={{ mb: 2 }} >
                            {changePrice>0 ? (
                                    <div>
                                        <DefaultText style={{color: "#FF484E"}}>{"+"}{changePrice}{"  "}</DefaultText>
                                        <DefaultText style={{color: "#FF484E"}}>{"("}{changePercent}{"%)"}</DefaultText>
                                    </div>
                                )
                                :
                                (
                                    <div >
                                        <DefaultText style={{color: "#026BFB"}}>{changePrice}</DefaultText>
                                        <DefaultText style={{color: "#026BFB"}}>{"("}{changePercent}{"%)"}</DefaultText>
                                    </div>
                                )
                            }
                        </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

const DefaultText = styled.text`

    //height: 100vh;

    //color: red;

    font-size: 13px;

    font-family: Pretendard;
    font-weight: 300;
  
    letter-spacing: 0.20000000298023224px;
    text-align: center;

`;

const MainText = styled.text`
  

    font-size: 25px;

    font-family: Pretendard;
    font-weight: 800;
`;



const TitleText = styled.text`
  

    font-size: 15px;

    font-family: Pretendard;
    font-weight: 700;
`;
