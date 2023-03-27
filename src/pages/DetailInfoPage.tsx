import StockDetailInfo from "../types/StockDetailInfo";
import "./styles.css";
import styled from 'styled-components';

import MarketStatusBox from '../components/MarketStatusBox';
import TypeTagBox from "../components/TypeTagBox";

type Props = {
    height : number,
    width: number,
}


export default function DetailInfoPage({width, height}:Props) {
    return (
        <div className="container">
            <div className="top-area">
                <div className="stock-title">
                    <TitleText>{stockInfo.stockTitle}</TitleText>
                    <MarketStatusBox isOpen={stockInfo.isOpen}></MarketStatusBox>
                    <div style={{paddingLeft: 15, paddingTop:8,}}>
                        <TypeTagBox text={stockInfo.stockType}/>
                        <TypeTagBox text={stockInfo.marketTitle}/>
                    </div>
                </div>
                <div>
                    {/*<ViewCard/>*/}
                </div>
            </div>
            <div className="main-area">
            </div>
        </div>
    );
}


const stockInfo: StockDetailInfo = {
    stockTitle: "Apple Inc.",
    marketPrice: "126.37", //가격
    currency: "미소", //화폐단위
    stockType:"EQUITY", //타입
    marketTitle:"NasdaqGS", //상장된 시장
    isOpen: false, //장의 상태
    change: 5.20, //변동가격
    changePercent: 0.1, //변동 퍼센트
}


const ViewCard = styled.div`
  
  width: 100vw;
  height: 109px;
  left: 25px;
  top: 142px;
    
  /* white */
    
  background: #FFFFFF;
  /* default shadow */
    
  box-shadow: 0px 0px 5px 1px rgba(103, 105, 106, 0.25);
  border-radius: 12px;
`;


const TitleText = styled.text`
  
    
    padding: 15px;
    height: 100vh;
  
    font-size: 3.5vh;
  
    font-family: Pretendard;
    font-weight: 700;
`;
