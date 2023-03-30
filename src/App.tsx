// import React, {useEffect, useState} from 'react';
// import './App.css';
// import {Routes, Route, BrowserRouter} from "react-router-dom";
// import {debounce} from "lodash";
//
//
// //import pages (for Route)
// import DetailInfoPage from "./pages/DetailInfoPage";
// import TmpPage from "./pages/ChartPage";
//
//
//
//
//
//
//
//
// function App() {
//     // const [width, setWidth] = useState(window.innerWidth);
//     // const [height, setHeight] = useState(window.innerHeight);
//     //
//     // const handleResize = debounce(() => {
//     //     setWidth(window.innerWidth);
//     //     setHeight(window.innerHeight);
//     // }, 200);
//     //
//     // useEffect(() => {
//     //     window.addEventListener("resize", handleResize);
//     //     return () => {
//     //         // cleanup
//     //         window.removeEventListener("resize", handleResize);
//     //     };
//     // }, []);
//
//
//
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<DetailInfoPage/>}/>
//       </Routes>
//     </BrowserRouter>
//   );
// }
//
// export default App;


import "./App.css";
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


import MarketStatusBox from './components/MarketStatusBox';
import TypeTagBox from "./components/TypeTagBox";
import StockDetailInfo from './types/StockDetailTypes';
import React, {useState} from "react";
import PriceLineChart from "./pages/chart/components/PriceLineChart";
import ChartPage from "./pages/chart/ChartPage";
import NewsPage from "./pages/news/NewsPage";
import {forEach} from "lodash";
import HomePage from "./pages/HomePage";
import StockInfoPage from "./pages/extraInfo/StockInfoPage";
import MainCardView from "./components/MainCardView";
import OptionPage from "./pages/options/OptionPage";
import CompanyInfoPage from "./pages/companyInfo/CompanyInfoPage";

const sections: sectionType[] = [
    { value: '1', component: <ChartPage/> },
    { value: '2', component: <StockInfoPage/> },
    { value: '3', component: <NewsPage/> },
    { value: '4', component: <CompanyInfoPage/> },
];

type sectionType = {
    value:string,
    component: JSX.Element,

}


function App() {

    //Tab
    const [value, setValue] = React.useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        // console.log(value);
    };


    const setTabValue = (index:string): void => {

        console.log("click");
        setValue(index);
        console.log(value);
    }


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
                    <MainCardView price={stockInfo.price} changePrice={stockInfo.changePrice} changePercent={stockInfo.changePercent} currency={"미소"}/>
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
                        value === '0' ? (
                            <HomePage setTabValue={setTabValue}/>
                        )
                            :
                        (
                         <div style={{height: '100%'}}>
                          {sections.map((s) => (
                               s.value === value ? (s.component):(<div/>)
                           ))}
                         </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
}


export default App;

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



