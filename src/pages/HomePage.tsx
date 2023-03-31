import react, {useState} from 'react';
import List from "@mui/material/List";
import {ListItem, ListItemText} from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TrendPieChart from "./extraInfo/components/TrendPieChart";
import CardView from "./extraInfo/components/CardView";
import * as React from "react";
import styled from "styled-components";
import SimilarStockTypes from "../types/SimilarStockTypes";
import StockDetailInfoTypes from "../types/StockDetailInfoTypes";
import PriceLineChart from "./chart/components/PriceLineChart";
import {Link} from "react-router-dom";
import StockNewsTypes from "../types/StockNewsTypes";


type Props = {
    setTabValue:(index:string) => void;
}


export default function HomePage({setTabValue}:Props) {
    //투자 트랜드
    const [period, setperiod] = useState('0m');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newperiod: string,
    ) => {
        setperiod(newperiod);
    };

    const showMoreView = (v:string) => {
        setTabValue(v);
    };


    const style = {
        width: '100%',
        maxWidth: '100%',
        bgcolor: 'background.paper',
    };

    return (
        <div style={{height: '100%', overflowY : "scroll"}}>
            <div style={{height: '400px', paddingTop: 20, paddingBottom: 60, backgroundColor: 'green'}}>
                <div style={{height: '30px', display: "flex", flexDirection: "row"}}>
                    <div style={{justifyContent: 'flex-start', flex:6}}>
                        <TitleText>{'오늘 시세'}</TitleText>
                    </div>
                    <div style={{textAlign:'right', flex:1, backgroundColor:'red'}} onClick={() => showMoreView('1')}>
                        <DefaultText>{"더보기"}</DefaultText>
                    </div>
                </div>
                <div style={{height: '370px', paddingTop: 25}}>
                    <div style={{height: "100%", display: 'flex', flexDirection: 'column'}}>
                        <div style={{height:"90%"}}>
                            <PriceLineChart period={period} />
                        </div>
                    </div>
                </div>
                </div>
            <div style={{height: 'fit-content', paddingTop: 5, paddingBottom: 60, backgroundColor: 'blue'}}>
                <div style={{height: '30px', display: "flex", flexDirection: "row"}}>
                    <div style={{justifyContent: 'flex-start', flex:6}}>
                        <TitleText>{'종목 뉴스'}</TitleText>
                    </div>
                    <div style={{textAlign:'right', flex:1, backgroundColor:'red'}} onClick={() => showMoreView('3')}>
                        <DefaultText>{"더보기"}</DefaultText>
                    </div>
                </div>
                <div>
                    <List sx={style} component="nav" aria-label="mailbox folders">
                        {newsList.stockNewsList.map((news: { link: string; title:string; date: string; }) => (
                            <div>
                                <ListItem button>
                                    <Link to={`${news.link}`} style={{ textDecoration: "none" , color: 'black'}}>
                                        <ListItemText primary={news.title} secondary={news.date} style={{fontFamily: 'Pretendard'}}/>
                                    </Link>
                                </ListItem>
                            </div>
                        ))}
                    </List>
                </div>
            </div>
            <div style={{height: '300px', paddingTop: 5, paddingBottom: 50, backgroundColor: 'blue'}}>
                <div style={{height: '30px',  display: "flex",flexDirection:'row'}}>
                    <div style={{justifyContent: 'flex-start', flex:6}}>
                        <TitleText>{'이달의 트랜드'}</TitleText>
                    </div>
                    <div style={{textAlign:'right', flex:1, backgroundColor:'red'}} onClick={() => showMoreView('2')}>
                        <DefaultText>{"더보기"}</DefaultText>
                    </div>
                </div>
                <div style={{height: '270px'}}>
                    <TrendPieChart period={period}/>
                </div>
            </div>
            <div style={{height: '200px', paddingTop: 5, paddingBottom: 5, backgroundColor: 'green'}}>
                <div style={{height: '30px'}}>
                    <TitleText>{similarStocks.stockTitle}{'와 유사한 종목'}</TitleText>
                    <div style={{ overflowX: "scroll", overflowY: 'hidden', height: '170px', display: "flex",flexDirection: 'row', alignItems: "center"}}>
                        {similarStocks.stockInfoList.map((s)=>(
                            <div style={{paddingRight: 15}}>
                                <CardView symbol={s.symbol} title={s.stockTitle} price={s.price} changePrice={s.changePrice} changePercent={s.changePercent}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}




const TitleText = styled.text`


    height: 100vh;

    font-size: 23px;

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
    text-align: center;

`;

const similarStocks :SimilarStockTypes = {
    "totalData": 5,
    "stockTitle": "Apple Inc.",
    "stockInfoList": [
        {
            "symbol": "AMZN",
            "stockTitle": "Amazon.com, Inc.",
            "price": 100.25,
            "changePrice": 3.01,
            "changePercent": 3.1
        },
        {
            "symbol": "TSLA",
            "stockTitle": "Tesla, Inc.",
            "price": 193.88,
            "changePrice": -4.69,
            "changePercent": -2.5
        },
        {
            "symbol": "GOOG",
            "stockTitle": "Alphabet Inc.",
            "price": 101.9,
            "changePrice": 0.54,
            "changePercent": 0.5
        },
        {
            "symbol": "META",
            "stockTitle": "Meta Platforms, Inc.",
            "price": 205.35,
            "changePrice": 4.67,
            "changePercent": 2.3
        },
        {
            "symbol": "NFLX",
            "stockTitle": "Netflix, Inc.",
            "price": 332.03,
            "changePrice": 8.51,
            "changePercent": 2.6
        },
    ],
};


const stockInfo: StockDetailInfoTypes  = {
    "exchangeName": "NasdaqGS",
    "fiftyTwoWeekHigh": 178.49,
    "fiftyTwoWeekLow": 124.17,
    "fiftyTwoWeekHighChange": -17.720001,
    "fiftyTwoWeekLowChange": 36.600006,
    "epsCurrentYear": 5.97,
    "typeDisp": "Equity",
    "region": "US",
    "financialCurrency": "USD",
    "averageDailyVolume10Day": 67475750,
    "averageDailyVolume3Month": 69210303
}

const newsList:StockNewsTypes = {
    "totalData": 20,
    "stockNewsList": [
        {
            "link": "https://finance.yahoo.com/m/8c0c4981-cdbe-3412-8888-9b3f681fbc44/dow-jones-futures-rise%3A.html?.tsrc=rss",
            "title": "Dow Jones Futures Rise: Micron Comments Lift Chips; LULU Stock Jumps On Earnings",
            "date": "7minutes ago"
        },
        {
            "link": "https://uk.finance.yahoo.com/news/binance-investors-withdraw-enforcement-action-us-regulators-113316406.html?.tsrc=rss",
            "title": "Binance: Investors withdraw more than $2bn after enforcement action by US regulators",
            "date": "13minutes ago"
        },
        {
            "link": "https://finance.yahoo.com/news/apple-inc-nasdaq-aapl-intrinsic-110123495.html?.tsrc=rss",
            "title": "Apple Inc.'s (NASDAQ:AAPL) Intrinsic Value Is Potentially 24% Below Its Share Price",
            "date": "47minutes ago"
        },
        {
            "link": "https://finance.yahoo.com/news/apple-pay-later-affirm-klarna-091700811.html?.tsrc=rss",
            "title": "Apple Pay Later can give Affirm and Klarna a run for their money",
            "date": "2hours ago"
        },
    ]
};