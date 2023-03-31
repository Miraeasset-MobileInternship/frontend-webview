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
import {useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Loader from "../../components/Loader";




type sectionType = {
    value:string,
    component: JSX.Element,

}


export default function DetailPage() {
    const navigate = useNavigate();

    const [cardLoading, setCardLoading] = useState(false);
    const [symbol, setSymbol] = useState("AAPL");


    const sections: sectionType[] = [
        { value: '1', component: <ChartTab/> },
        { value: '2', component: <StockInfoTab/> },
        { value: '3', component: <NewsTab/> },
        { value: '4', component: <CompanyInfoTab symbol={symbol}/> },
    ];


    //Tab
    const [value, setValue] = React.useState('0');

    const [stockInfo, setStockInfo] = useState<StockDetailInfo|null>();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        // console.log(value);
    };


    const setTabValue = (index:string): void => {

        console.log("click");
        setValue(index);
        console.log(value);
    }


    //stockInfo(view카드)
    const getStockInfo =
        (stockId: string) => {

                setCardLoading(true);
                detailInfoService.getStockDetail(stockId)
                        .then( res => {

                            setCardLoading(false);
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
            };


    //리로드 시마다 1회만 실행
    useEffect(() => {
        getStockInfo(symbol);
    },[]);

    return (
        <div className="container">
            <div className="top-area">
                    {/*특정 div 내로 좁아지는 패딩을 넣고 싶을 땐 내부 div를 만들어서 넣어야함*/}
                    {cardLoading ? (
                        <Loader/>
                        ) : (
                        <>
                            <div className="stock-title">
                            <TitleText>{stockInfo?.stockTitle}</TitleText>
                            <MarketStatusBox isOpen={stockInfo?.tagInfo.open}></MarketStatusBox>
                            <div style={{backgroundColor: "red", paddingTop:3}}>
                                <TypeTagBox text={stockInfo?.tagInfo.type}/>
                                <TypeTagBox text={stockInfo?.tagInfo.market}/>
                            </div>
                            </div>
                        {/*카드 뷰를 둘러싼 padding*/}
                            <div className="card-view">
                            <MainCardView price={stockInfo?.price} changePrice={stockInfo?.changePrice} changePercent={stockInfo?.changePercent} currency={"미소"}/>
                            </div>
                        </>

                    )}
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
                                <HomeTab setTabValue={setTabValue}/>
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



