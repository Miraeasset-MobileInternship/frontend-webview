import "../styles.css";
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React, {useEffect, useState} from "react";
import MarketStatusBox from "./components/MarketStatusBox";
import TypeTagBox from "./components/TypeTagBox";
import MainCardView from "./components/MainCardView";
import HomeTab from "./tabs/HomeTab";
import StockDetailInfo from "../../types/StockDetailTypes";
import ChartTab from "./tabs/ChartTab";
import NewsTab from "./tabs/NewsTab";
import CompanyInfoTab from "./tabs/CompanyInfoTab";
import StockInfoTab from "./tabs/StockInfoTab";
import detailInfoService from "../../services/detailInfoService";
import {useNavigate, useParams} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Loader from "../../components/Loader";
import sellingStockService from "../../services/sellingStockService";
import classService from "../../services/classService";
import ClassCurrencyTypes from "../../types/ClassCurrencyTypes";




type sectionType = {
    value:string,
    component: JSX.Element,

}


export default function DetailPage() {
    // link에서 symbol을 가져오기
    const params = useParams();
    const symbol:string = params.stockId as string;


    const navigate = useNavigate();

    const [cardLoading, setCardLoading] = useState(true);
    const [sellLoading, setSellLoading] = useState(true);

    const setTabValue = (index:string): void => {

        setValue(index);
        console.log(value);
    }

    const sections: sectionType[] = [
        { value: '0', component: <HomeTab setTabValue={setTabValue} symbol={symbol}/>},
        { value: '1', component: <ChartTab symbol={symbol}/> },
        { value: '2', component: <StockInfoTab symbol={symbol}/> },
        { value: '3', component: <NewsTab symbol={symbol}/> },
        { value: '4', component: <CompanyInfoTab symbol={symbol}/> },
    ];


    //Tab
    const [value, setValue] = React.useState('0');

    const [stockInfo, setStockInfo] = useState<StockDetailInfo|null>();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        // console.log(value);
    };


    //getCurrency
    const [currency, setCurrency] = useState<ClassCurrencyTypes>();


    //stockInfo(view카드)
    const getStockInfo =
        (stockId: string, classId:number) => {
                setCardLoading(true)
                detailInfoService.getStockDetail(stockId)
                        .then( res => {

                            // setCardLoading(false)
                            if(res.data.status.status === "E000"){
                                // @ts-ignore
                                setStockInfo(res.data.result);
                            }else{
                                navigate("/error"); //여기서 에러나면 그냥 에러페이지로
                            }

                        })
                        .catch(reason => {
                           console.log(reason);
                            navigate("/error"); //여기서 에러나면 그냥 에러페이지로
                        });



                classService.getCurrency(classId)
                    .then( res => {

                        setCardLoading(false)
                        if(res.data.status.status === "E000"){
                            // @ts-ignore
                            setCurrency(res.data.result);
                        }else{
                            setCurrency(tmpCurrency);
                        }

                    })
                    .catch(reason => {
                        console.log(reason);
                        // navigate("/error"); //여기서 에러나면 크게 중요한거 아니니 그냥 무시하고 단위 안보여주기
                    });

        };



    const [sellAvailable, setSellAvailable] = useState(false);
    const checkSelling =
        (stockId: string, studentId:number) => {

            setSellLoading(true)
            // 이 페이지에서는 all로 간다
            sellingStockService.checkSelling(stockId, studentId)
                .then( res => {


                    setSellLoading(false);
                    if(res.data.status.status === "E000"){
                        setSellAvailable(true);
                    }else if(res.data.status.status === "E901"){
                        //보유하지 않은 종목을 판매하려고 하는 경우 -> 버튼 disable해야할듯
                        setSellAvailable(false);
                    }
                    else{
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
        getStockInfo(symbol,4);
        checkSelling(symbol, 10);
    },[]);

    return (
        <div className="container">
            <div className="top-area">
                <>
                    {
                        cardLoading&&sellLoading ?
                            (
                                <Loader/>
                            )
                            :
                            (
                                stockInfo&&currency &&
                                    <>
                                        <div className="stock-title">
                                            {
                                                stockInfo.stockTitle.length >= 18 ?
                                                (
                                                    <>
                                                        <TitleText style={{fontSize:'2.8vh'}}>{stockInfo.stockTitle}</TitleText>
                                                        <MarketStatusBox isOpen={stockInfo.tagInfo.open}></MarketStatusBox>
                                                        <TypeTagBox text={stockInfo.tagInfo.type}/>
                                                        <TypeTagBox text={stockInfo.tagInfo.market}/>
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <TitleText>{stockInfo.stockTitle}</TitleText>
                                                        <MarketStatusBox isOpen={stockInfo.tagInfo.open}></MarketStatusBox>
                                                        <div style={{paddingTop:5}}>
                                                            <TypeTagBox text={stockInfo.tagInfo.type}/>
                                                            <TypeTagBox text={stockInfo.tagInfo.market}/>
                                                        </div>
                                                    </>
                                                )
                                            }

                                        </div>
                                        {/*카드 뷰를 둘러싼 padding*/}
                                        <div className="card-view">
                                            <MainCardView price={stockInfo.price} changePrice={stockInfo.changePrice} changePercent={stockInfo.changePercent} currency={currency.currency} sellAvailable={sellAvailable}/>
                                        </div>
                                    </>

                            )
                    }
                </>
            </div>
            <div className="main-area">
                <div className="tab-nav">
                    <Box>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons={false}
                            textColor={'inherit'}
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "black",
                                    fontFamily: 'Pretendard'
                                }
                            }}
                            defaultValue='0'
                        >
                            <Tab label="HOME" value='0'/>
                            <Tab label="차트" value='1'/>
                            <Tab label="종목정보" value='2'/>
                            <Tab label="종목뉴스"  value='3'/>
                            <Tab label="기업정보"  value='4'/>
                        </Tabs>
                    </Box>
                </div>
                <div className="scroll-view-area">
                    {
                                <div style={{height: '100%'}}>
                                    {sections.map((s) => (
                                        s.value === value ? (s.component):(<div/>)
                                    ))}
                                </div>
                    }

                </div>
            </div>
        </div>
    );
}




// const stockInfo: StockDetailInfo= {
//     symbol:"AAPL",
//     stockTitle: "Apple Inc.",
//     price: 126.37, //가격
//     changePrice: 5.20, //변동가격
//     changePercent: 0.1, //변동 퍼센트
//     tagInfo: {
//         type: "EQUITY",
//         market: "Nasdaq",
//         customPriceConfidence: "HIGH",
//         open: false,
//     },
// };


const ViewCard = styled.div`

  height: 100%;
  /* white */

  background: #FFFFFF;
  /* default shadow */

  box-shadow: 0px 0px 5px 1px rgba(103, 105, 106, 0.25);
  border-radius: 12px;
`;

const DefaultText = styled.text`

    //height: 100vh;

    color: #67696A;

    font-size: 1.5vh;

    font-family: Pretendard;
    font-weight: 400;
`;

const MainText = styled.text`


    //height: 100vh;

    font-size: 3.5vh;

    font-family: Pretendard;
    font-weight: 700;
`;



const TitleText = styled.text`


    height: 100vh;

    font-size: 3.5vh;

    font-family: Pretendard;
    font-weight: 700;
`;



const tmpCurrency:ClassCurrencyTypes = {
    classId: -1,
    currency: "",
}