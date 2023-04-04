import * as React from 'react';
import StockBuyingCheckTypes from "../../types/StockBuyingCheckTypes";
import styled from "styled-components";
import {Button, Popover, TextField, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import detailInfoService from "../../services/detailInfoService";
import buyingStockService from "../../services/buyingStockService";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../components/Loader";

interface Props {
    studentId:number;
}


export default function BuyPage({studentId}:Props) {
    const params = useParams();
    const symbol:string = params.stockId as string;

    const navigate = useNavigate();

    //
    const [amount,setAmount] = useState<number>(0);
    const [price,setPrice] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const handleTyping = (event:React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
        var num: number = +event.target.value;
        setAmount(num);
    }

    //buying check
    const [loading, setLoading] = useState(true);
    const [buyingCheck,setBuyingCheck] = useState<StockBuyingCheckTypes|null>(null);
    const checkBuying =
        (stockId: string, studentId:number) => {


            // 이 페이지에서는 all로 간다
            buyingStockService.checkBuying(stockId, studentId)
                .then( res => {

                    setLoading(false);
                    if(res.data.status.status === "E000"){
                        // @ts-ignore
                        setBuyingCheck(res.data.result);

                        // @ts-ignore
                        setPrice(res.data.result.price);
                    }else{
                        //주식 가격정보를 못가져오면 그냥 에러
                        navigate("/error");
                    }

                })
                .catch(reason => {
                    console.log(reason);
                    navigate("/error"); //여기서 에러나면 그냥 에러페이지로
                });
        };


    //리로드 시마다 1회만 실행
    useEffect(() => {
        checkBuying(symbol,studentId);
    },[]);



    //매수기능
    const [buyLoading, setBuyLoading] = useState(false);
    const buyingStocks =
        () => {
            setBuyLoading(true);



            // 이 페이지에서는 all로 간다
            buyingStockService.buyingStock(studentId,symbol,amount,price)
                .then( res => {

                    setBuyLoading(false);

                    if(res.data.status.status === "E000"){
                        // @ts-ignore
                        navigate("/"+symbol+"/stock-success");
                    }else if(res.data.status.status === "E903"){
                        //돈이 부족해서 거래가 안되는 경우->에러 메세지에 표시
                        setErrorMessage(res.data.status.message);
                    }else{
                        //다른 에러는 유저가 알필요 없는 에러(db등)
                        navigate("/"+symbol+"/stock-error");
                    }

                })
                .catch(reason => {
                    // console.log(reason);
                    // console.log("fronterror ")
                    navigate("/"+symbol+"/stock-error"); //여기서 에러나면 그냥 에러페이지로
                });
        };



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
        <>
        {
            loading||buyLoading ?
                (
                    <div style={{height:'100vh'}}>
                        <Loader/>
                    </div>
                )
                :
                    (

                        buyingCheck &&

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
                                            onChange={handleTyping}
                                            style={{width: '100%', backgroundColor: '#FFF5F5', borderRadius: 12}}
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
                                            <DefaultText style={{textAlign: 'left', padding:5, color: '#FF484E'}}>{errorMessage}</DefaultText>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="btn-area">
                                <CustomBtn onClick={buyingStocks}>
                                    <ButtonText>{"매수하기"}</ButtonText>
                                </CustomBtn>
                            </div>
                        </div>
                    )
        }
        </>
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





// const buyingCheck: StockBuyingCheckTypes  = {
//     "stockId": "AAPL",
//     "stockTitle": "Apple",
//     "marketPrice": "164.90",
//     "price": 165,
//     "currency": "꿈"
// }