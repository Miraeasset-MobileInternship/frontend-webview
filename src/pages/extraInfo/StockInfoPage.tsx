import react, {useState} from 'react';
import TrendPieChart from "./components/TrendPieChart";
import styled from "styled-components";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import * as React from "react";
import SimilarStockTypes from "../../types/SimilarStockTypes";
import CardView from "./components/CardView";

export default function StockInfoPage() {
    //투자 트랜드
    const [period, setperiod] = useState('0m');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newperiod: string,
    ) => {
        setperiod(newperiod);
    };




    return (
        <div style={{height: '100%', overflowY : "scroll"}}>
            <div>
            {/*    회사 정보*/}
            </div>
            <div style={{height: '330px', paddingTop: 5, paddingBottom: 5, backgroundColor: 'blue'}}>
                <div style={{height: '30px',}}>
                    <TitleText>{'최근 투자 트랜드'}</TitleText>
                </div>
                <div style={{height: '40px', padding:8, backgroundColor: 'red'}}>
                    <ToggleButtonGroup
                        color="primary"
                        value={period}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        size = "small"
                    >
                        <ToggleButton value="0m">현재</ToggleButton>
                        <ToggleButton value="-1m">1달 전</ToggleButton>
                        <ToggleButton value="-2m">2달 전</ToggleButton>
                        <ToggleButton value="-3m">3달 전</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div style={{height: '260px'}}>
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