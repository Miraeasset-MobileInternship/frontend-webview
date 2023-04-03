import * as React from 'react';
import StockBuyingCheckTypes from "../../types/StockBuyingCheckTypes";
import styled from "styled-components";
import {Button, Popover, TextField, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useState} from "react";

interface Props {
    symbol:string;
    studentId:number;
}


export default function BuyPage({symbol, studentId}:Props) {
    //
    const [amount,setAmount] = useState(0);


    //설명창
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="stock-container">
            <div className="title-area">
                <TitleText>{buyingCheck.stockTitle}</TitleText>
            </div>
            <div className="main-view-area">
                <div style={{height: "50%"}}>
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom:10}}>
                        <DefaultText>{"시장 현재가"}</DefaultText>
                        <div style={{paddingTop:5}}>
                            <TitleText>{buyingCheck.marketPrice}</TitleText>
                            <DefaultText>{" "}{buyingCheck.currency}</DefaultText>
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom:10}}>
                        <Typography
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                        >
                            <DefaultText>{"구매 가능 가격"}</DefaultText>
                        </Typography>
                        <Popover
                            id="mouse-over-popover"
                            sx={{
                                pointerEvents: 'none',
                            }}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                        >
                            <Typography sx={{ p: 1}}>소수점 이하만큼 수수료가 발생해요</Typography>
                        </Popover>
                        <div style={{paddingTop:5}}>
                            <TitleText>{buyingCheck.price}</TitleText>
                            <DefaultText>{" "}{buyingCheck.currency}</DefaultText>
                        </div>
                    </div>
                    <div style={{height:'50%',display:"flex", flexDirection:'column',justifyContent:'center', alignItems:'center', }}>
                        <TextField
                            hiddenLabel
                            id="outlined-number"
                            type="number"
                            placeholder="몇 개를 구매할까요?"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{width: '100%', backgroundColor: '#FFF5F5'}}
                            sx={{color:'red',

                                '& .MuiOutlinedInput-root ' :{
                                    '& fieldset': {
                                        border: '0px solid white',
                                    },
                                    '&:hover fieldset': {
                                        border: '1px solid #FF484E',
                                    },
                                    '&.Mui-focused fieldset': {
                                        border: '1px solid #FF484E',
                                    },
                                }

                                }}
                        />
                        <div style={{display: 'flex', alignItems: 'flex-start', backgroundColor:'white', width:'100%'}}>
                            <DefaultText style={{textAlign: 'left', padding:5, color: '#FF484E'}}>{"에러"}</DefaultText>
                        </div>
                    </div>

                </div>
            </div>
            <div className="btn-area">
                <CustomBtn>
                    <ButtonText>{"매수하기"}</ButtonText>
                </CustomBtn>
            </div>
        </div>
    );
}

const CustomTextField = styled(TextField)`
  & label.Mui-focused {
    color: red;
  }

  & .MuiInput-underline:after {
    borderBottomColor: green;
  },
  
  
  &. MuiOutlined-root {
  &.fieldset {
    border-color: red;
  }
}
  
  & .MuiOutlinedInput-root {
    &.fieldset {
      border-color: red;
    }
    &.Mui-focused fieldset {
      border-color: white;
    }
    &:hover fieldset{
      border-color: white;
    }
  }
`;


const TitleText = styled.text`

  

    font-size: 25px;

    font-family: Pretendard;
    font-weight: 700;
`;


const DefaultText = styled.text`

    //height: 100vh;
  
    font-size: 15px;

    font-family: Pretendard;
    font-weight: 300;


    color : #67696A;
    letter-spacing: 0.20000000298023224px;


`;


const CustomBtn = styled.div`
  
    height: 65%;
    border-radius: 12px;
    flex:1;
  
    background-color: #FF484E;
  
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





const buyingCheck: StockBuyingCheckTypes  = {
    "stockId": "AAPL",
    "stockTitle": "Apple",
    "marketPrice": "164.90",
    "price": 165,
    "currency": "꿈"
}