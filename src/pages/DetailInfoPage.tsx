import "./styles.css";
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


import MarketStatusBox from '../components/MarketStatusBox';
import TypeTagBox from "../components/TypeTagBox";
import StockDetailInfo from '../types/StockDetailTypes';
import React, {useState} from "react";
import PriceLineChart from "../components/PriceLineChart";
import ChartPage from "./ChartPage";
import NewsPage from "./NewsPage";
import {Link, Route, Routes} from "react-router-dom";
import TmpPage from "./ChartPage";
import {forEach} from "lodash";
import HomePage from "./HomePage";
import StockInfoPage from "./StockInfoPage";

const sections: sectionType[] = [
    { value: '0', component: <HomePage/> },
    { value: '1', component: <ChartPage/> },
    { value: '2', component: <NewsPage/> },
    { value: '3', component: <StockInfoPage/> },
    { value: '4', component: <NewsPage/> },
];

type sectionType = {
    value:string,
    component: JSX.Element,

}


export default function DetailInfoPage() {

    //Tab
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        console.log(value);
    };

    // @ts-ignore
    return (
        <div className="container">
            <div className="top-area">
                <div className="stock-title">
                    {/*특정 div 내로 좁아지는 패딩을 넣고 싶을 땐 내부 div를 만들어서 넣어야함*/}
                        <TitleText>{stockInfo.stockTitle}</TitleText>
                        <MarketStatusBox isOpen={stockInfo.tagInfo.open}></MarketStatusBox>
                        <div style={{backgroundColor: "red", paddingTop:3}}>
                            <TypeTagBox text={stockInfo.tagInfo.type}/>
                            <TypeTagBox text={stockInfo.tagInfo.market}/>
                        </div>
                </div>
                {/*카드 뷰를 둘러싼 padding*/}
                <div className="card-view">
                        <ViewCard>
                        {/*카드 뷰 내부의 패딩*/}
                            <div style={{padding:15}}>
                                <DefaultText>{"오늘 주가"}</DefaultText>
                                <div style={{paddingTop:5}}>
                                    <MainText>{stockInfo.price}</MainText>
                                    <DefaultText>{"미소"}</DefaultText>
                                </div>
                            <div>
                                {stockInfo.changePrice >=0 ?
                                    (
                                        <div>
                                            <DefaultText style={{color: "#D06464"}}>{"+"}{stockInfo.changePrice}{"미소"}</DefaultText>
                                            <DefaultText style={{color: "#D06464"}}>{"(+"}{stockInfo.changePercent}{"%)"}</DefaultText>
                                        </div>
                                    ):
                                    (
                                        <div>
                                            <DefaultText style={{color: "#5787DE"}}>{"-"}{stockInfo.changePrice}{"미소"}</DefaultText>
                                            <DefaultText style={{color: "#5787DE"}}>{"(-"}{stockInfo.changePercent}{"%)"}</DefaultText>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </ViewCard>
                </div>
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
                        >
                            <Tab label="HOME" value='0'/>
                            <Tab label="차트" value='1'/>
                            <Tab label="관련뉴스" value='2'/>
                            <Tab label="종목정보"  value='3'/>
                            <Tab label="종목정보"  value='4'/>
                        </Tabs>
                    </Box>
                </div>
                <div className="scroll-view-area">
                    {sections.map((s) => (
                        s.value === value ? (s.component):(<div/>)
                    ))}
                </div>
            </div>
        </div>
    );
}



const stockInfo: StockDetailInfo= {
    symbol:"AAPL",
    stockTitle: "Apple Inc.",
    price: 126.37, //가격
    changePrice: 5.20, //변동가격
    changePercent: 0.1, //변동 퍼센트
    tagInfo: {
        type: "EQUITY",
        market: "Nasdaq",
        customPriceConfidence: "HIGH",
        open: false,
    },
};


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



