

import * as React from 'react';
import WatchedStockInfoTypes from "../../types/WatchedStockInfoTypes";
import List from "@mui/material/List";
import {Divider, ListItem} from "@mui/material";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import StockNewsTypes from "../../types/StockNewsTypes";
import detailInfoService from "../../services/detailInfoService";
import ErrorView from "../details/components/ErrorView";
import Loader from "../../components/Loader";


export default function RankPage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [watchList, setWatchList] = useState<WatchedStockInfoTypes|null>(null);

    //stockInfo(view카드)
    const getWatchList =
        () => {

            setLoading(true);
            // 이 페이지에서는 all로 간다
            detailInfoService.getWatchList(100)
                .then( res => {

                    setLoading(false);

                    if(res.data.status.status === "E000"){
                        // @ts-ignore
                        setWatchList(res.data.result);
                    }else{
                        setErrorStatus(true);
                    }

                })
                .catch(reason => {
                    console.log(reason);
                    navigate("/error"); //여기서 에러나면 그냥 에러페이지로
                });
        };


    //리로드 시마다 1회만 실행
    useEffect(() => {
        getWatchList()
    },[]);


    return (
        <>
            {
                loading ?
                    (
                        <Loader/>
                    )
                    :
                    (
                        <>
                            {
                                errorStatus ?
                                    (
                                        <ErrorView/>
                                    )
                                    :
                                    (
                                        watchList &&

                                            <>
                                                <div style={{height: "100%", display: 'flex', flexDirection: 'column', overflowY: "hidden"}}>
                                                    <div style={{height: '30px',}}>
                                                        <TitleText>{'상승가 인기 종목 순위'}</TitleText>
                                                    </div>
                                                    <div style={{height: 'fit-content'}}>
                                                        <List
                                                            sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
                                                        >
                                                            <ListItem>
                                                                <div style={{width: '100%', display:"flex", flexDirection:"row", alignItems: 'center'}}>
                                                                    <div style={{flex:2, backgroundColor: 'red'}}>
                                                                        <RankTitleText>{"순위"}</RankTitleText>
                                                                    </div>
                                                                    <div style={{flex:9, backgroundColor: 'blue'}}>
                                                                        <RankTitleText>{"종목명"}</RankTitleText>
                                                                    </div>
                                                                    <div style={{flex:3, textAlign:'right',backgroundColor: 'green'}}>
                                                                        <RankTitleText>{"현재가"}</RankTitleText>
                                                                    </div>
                                                                    <div style={{flex:3, textAlign:'right',backgroundColor: 'purple'}}>
                                                                        <RankTitleText>{"등락률"}</RankTitleText>
                                                                    </div>
                                                                </div>
                                                            </ListItem>
                                                            <Divider />
                                                            {watchList.watchedStockInfoList.map((w)=>(
                                                                <><ListItem>
                                                                    <div style={{width: '100%', display: "flex", flexDirection: "row", alignItems: 'center'}}>
                                                                        <div style={{flex: 2, textAlign: 'center', backgroundColor: 'red'}}>
                                                                            <RankText>{w.rank}</RankText>
                                                                        </div>
                                                                        <div style={{flex: 9, backgroundColor: 'blue'}}>
                                                                            <RankTitleText>{w.stockTitle}</RankTitleText>
                                                                        </div>
                                                                        {w.price >= 0 ?
                                                                            (
                                                                                <>
                                                                                    <div style={{flex: 3, textAlign: 'right', backgroundColor: 'green'}}>
                                                                                        <RankPriceText
                                                                                            style={{color: "#D06464"}}>{"+"}{w.changePrice}</RankPriceText>
                                                                                    </div>
                                                                                    <div style={{flex: 3, textAlign: 'right', backgroundColor: 'purple'}}>
                                                                                        <RankPriceText
                                                                                            style={{color: "#D06464"}}>{w.changePercent}{"%"}</RankPriceText>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                            :
                                                                            (
                                                                                <>
                                                                                    <div style={{flex: 3, textAlign: 'right', backgroundColor: 'green'}}>
                                                                                        <RankPriceText
                                                                                            style={{color: "#5787DE"}}>{"-"}{w.changePrice}</RankPriceText>
                                                                                    </div>
                                                                                    <div style={{flex: 3, textAlign: 'right', backgroundColor: 'purple'}}>
                                                                                        <RankPriceText
                                                                                            style={{color: "#5787DE"}}>{w.changePercent}{"%"}</RankPriceText>
                                                                                    </div>
                                                                                </>
                                                                            )}
                                                                    </div>
                                                                </ListItem><Divider/></>
                                                            ))}
                                                        </List>
                                                    </div>
                                                </div>
                                            </>

                                    )
                            }
                        </>
                    )
            }
        </>
    );
}

const TitleText = styled.text`


    height: 100vh;

    font-size: 23px;

    font-family: Pretendard;
    font-weight: 700;
`;


const watchList : WatchedStockInfoTypes = {
    "totalData": 100,
    "watchedStockInfoList": [
        {
            "symbol": "NAAS",
            "stockTitle": "NaaS Technology",
            "price": 9.24,
            "changePercent": 18.9,
            "changePrice": 1.47,
            "rank": 1
        },
        {
            "symbol": "HNNMY",
            "stockTitle": "HENNES & MAURITZ SPON ADR EACH ",
            "price": 2.71,
            "changePercent": 17.8,
            "changePrice": 0.41,
            "rank": 2
        },
        {
            "symbol": "CXM",
            "stockTitle": "Sprinklr",
            "price": 12.79,
            "changePercent": 17.6,
            "changePrice": 1.91,
            "rank": 3
        },
        {
            "symbol": "FLNC",
            "stockTitle": "Fluence Energy",
            "price": 18.64,
            "changePercent": 14.7,
            "changePrice": 2.39,
            "rank": 4
        },
        {
            "symbol": "HSAI",
            "stockTitle": "Hesai",
            "price": 16.98,
            "changePercent": 12.7,
            "changePrice": 1.92,
            "rank": 5
        },
        {
            "symbol": "HELFY",
            "stockTitle": "HELLOFRESH SE UNSPON ADS EACH R",
            "price": 5.63,
            "changePercent": 11.9,
            "changePrice": 0.6,
            "rank": 6
        },
        {
            "symbol": "PBMRF",
            "stockTitle": "BUMI RESOURCES TBK",
            "price": 0.01,
            "changePercent": 11.4,
            "changePrice": 0,
            "rank": 7
        },
        {
            "symbol": "OCDDY",
            "stockTitle": "Ocado",
            "price": 12.97,
            "changePercent": 10.1,
            "changePrice": 1.19,
            "rank": 8
        },
        {
            "symbol": "CGSHY",
            "stockTitle": "Country Garden Services Holdings Company",
            "price": 1.79,
            "changePercent": 8.5,
            "changePrice": 0.14,
            "rank": 9
        },
        {
            "symbol": "BPIRY",
            "stockTitle": "PIRAEUS FINANCIAL HOLDINGS S.A ",
            "price": 2.18,
            "changePercent": 8.2,
            "changePrice": 0.16,
            "rank": 10
        },
        {
            "symbol": "PHJMF",
            "stockTitle": "HANJAYA MANDALA SAMPOERNA",
            "price": 0.09,
            "changePercent": 8.1,
            "changePrice": 0.01,
            "rank": 11
        },
        {
            "symbol": "FLMMF",
            "stockTitle": "Filo Mining",
            "price": 17.04,
            "changePercent": 7.8,
            "changePrice": 1.24,
            "rank": 12
        },
        {
            "symbol": "JD",
            "stockTitle": "JD.com",
            "price": 44.4,
            "changePercent": 7.8,
            "changePrice": 3.22,
            "rank": 13
        },
        {
            "symbol": "CD",
            "stockTitle": "Chindata",
            "price": 7.09,
            "changePercent": 7.3,
            "changePrice": 0.48,
            "rank": 14
        },
        {
            "symbol": "CIG-C",
            "stockTitle": "Comp En De Mn Cemig",
            "price": 3.39,
            "changePercent": 6.9,
            "changePrice": 0.22,
            "rank": 15
        },
        {
            "symbol": "GOL",
            "stockTitle": "Gol Linhas Aéreas Inteligentes",
            "price": 2.63,
            "changePercent": 6.9,
            "changePrice": 0.17,
            "rank": 16
        },
        {
            "symbol": "MNSO",
            "stockTitle": "MINISO Group Holding",
            "price": 17.42,
            "changePercent": 6.7,
            "changePrice": 1.09,
            "rank": 17
        },
        {
            "symbol": "KC",
            "stockTitle": "Kingsoft Cloud",
            "price": 7.86,
            "changePercent": 6.6,
            "changePrice": 0.49,
            "rank": 18
        },
        {
            "symbol": "LINRF",
            "stockTitle": "Liontown Resources",
            "price": 1.8,
            "changePercent": 6.5,
            "changePrice": 0.11,
            "rank": 19
        },
        {
            "symbol": "PETRY",
            "stockTitle": "Vibra Energia",
            "price": 5.46,
            "changePercent": 6.4,
            "changePrice": 0.33,
            "rank": 20
        },
        {
            "symbol": "ROG",
            "stockTitle": "Rogers",
            "price": 162.83,
            "changePercent": 6.4,
            "changePrice": 9.83,
            "rank": 21
        },
        {
            "symbol": "NIO",
            "stockTitle": "NIO",
            "price": 10.46,
            "changePercent": 6.4,
            "changePrice": 0.63,
            "rank": 22
        },
        {
            "symbol": "ADDYY",
            "stockTitle": "ADIDAS AG ADR EA REP 1/2 ORD NP",
            "price": 84.57,
            "changePercent": 6.4,
            "changePrice": 5.09,
            "rank": 23
        },
        {
            "symbol": "AI",
            "stockTitle": "C3.ai",
            "price": 27.63,
            "changePercent": 6.4,
            "changePrice": 1.65,
            "rank": 24
        },
        {
            "symbol": "PCCYF",
            "stockTitle": "PetroChina Company",
            "price": 0.59,
            "changePercent": 6.3,
            "changePrice": 0.03,
            "rank": 25
        },
        {
            "symbol": "VERX",
            "stockTitle": "Vertex",
            "price": 20.93,
            "changePercent": 6.3,
            "changePrice": 1.24,
            "rank": 26
        },
        {
            "symbol": "ERIC",
            "stockTitle": "Ericsson",
            "price": 5.78,
            "changePercent": 6.3,
            "changePrice": 0.34,
            "rank": 27
        },
        {
            "symbol": "SID",
            "stockTitle": "Companhia Siderurgica Nacional ",
            "price": 3.08,
            "changePercent": 6.2,
            "changePrice": 0.18,
            "rank": 28
        },
        {
            "symbol": "RLX",
            "stockTitle": "RLX Technology",
            "price": 2.74,
            "changePercent": 6.2,
            "changePrice": 0.16,
            "rank": 29
        },
        {
            "symbol": "AU",
            "stockTitle": "AngloGold Ashanti",
            "price": 24.15,
            "changePercent": 6.1,
            "changePrice": 1.39,
            "rank": 30
        },
        {
            "symbol": "PHG",
            "stockTitle": "Koninklijke Philips",
            "price": 17.91,
            "changePercent": 6,
            "changePrice": 1.02,
            "rank": 31
        },
        {
            "symbol": "BRPHF",
            "stockTitle": "Galaxy Digital",
            "price": 3.76,
            "changePercent": 6,
            "changePrice": 0.21,
            "rank": 32
        },
        {
            "symbol": "RMBS",
            "stockTitle": "Rambus",
            "price": 50.53,
            "changePercent": 5.9,
            "changePrice": 2.83,
            "rank": 33
        },
        {
            "symbol": "NUVA",
            "stockTitle": "NuVasive",
            "price": 40.64,
            "changePercent": 5.9,
            "changePrice": 2.27,
            "rank": 34
        },
        {
            "symbol": "VSAT",
            "stockTitle": "Viasat",
            "price": 32.76,
            "changePercent": 5.8,
            "changePrice": 1.8,
            "rank": 35
        },
        {
            "symbol": "VONOY",
            "stockTitle": "VONOVIA SE UNSPN ADR EACH REP 0",
            "price": 9.42,
            "changePercent": 5.7,
            "changePrice": 0.51,
            "rank": 36
        },
        {
            "symbol": "DADA",
            "stockTitle": "Dada Nexus",
            "price": 8.74,
            "changePercent": 5.7,
            "changePrice": 0.47,
            "rank": 37
        },
        {
            "symbol": "VWDRY",
            "stockTitle": "VESTAS WIND SYSTEMS ADR EACH RE",
            "price": 9.6,
            "changePercent": 5.6,
            "changePrice": 0.51,
            "rank": 38
        },
        {
            "symbol": "MPNGF",
            "stockTitle": "MEITUAN",
            "price": 18.45,
            "changePercent": 5.5,
            "changePrice": 0.97,
            "rank": 39
        },
        {
            "symbol": "IFNNY",
            "stockTitle": "INFINEON TECHNOLOGIES AG SPON A",
            "price": 41.11,
            "changePercent": 5.5,
            "changePrice": 2.15,
            "rank": 40
        },
        {
            "symbol": "FIVN",
            "stockTitle": "Five9",
            "price": 68.57,
            "changePercent": 5.4,
            "changePrice": 3.52,
            "rank": 41
        },
        {
            "symbol": "AQN",
            "stockTitle": "Algonquin Power & Utilities",
            "price": 8.58,
            "changePercent": 5.4,
            "changePrice": 0.44,
            "rank": 42
        },
        {
            "symbol": "SITC-PA",
            "stockTitle": "SITE Centers Corp. 6.375%",
            "price": 23.28,
            "changePercent": 5.2,
            "changePrice": 1.16,
            "rank": 43
        },
        {
            "symbol": "SLG-PI",
            "stockTitle": "SL Green Realty Corporation Pre",
            "price": 18.77,
            "changePercent": 5.2,
            "changePrice": 0.93,
            "rank": 44
        },
        {
            "symbol": "TWO-PC",
            "stockTitle": "Two Harbors Investments Corp 7.",
            "price": 19.83,
            "changePercent": 5.1,
            "changePrice": 0.96,
            "rank": 45
        },
        {
            "symbol": "NU",
            "stockTitle": "Nu",
            "price": 4.81,
            "changePercent": 5,
            "changePrice": 0.23,
            "rank": 46
        },
        {
            "symbol": "BEKE",
            "stockTitle": "KE",
            "price": 18.82,
            "changePercent": 5,
            "changePrice": 0.89,
            "rank": 47
        },
        {
            "symbol": "PDD",
            "stockTitle": "PDD",
            "price": 76.44,
            "changePercent": 4.9,
            "changePrice": 3.58,
            "rank": 48
        },
        {
            "symbol": "CROX",
            "stockTitle": "Crocs",
            "price": 125.06,
            "changePercent": 4.9,
            "changePrice": 5.8,
            "rank": 49
        },
        {
            "symbol": "FUTU",
            "stockTitle": "Futu",
            "price": 51.77,
            "changePercent": 4.8,
            "changePrice": 2.38,
            "rank": 50
        },
        {
            "symbol": "CSCCF",
            "stockTitle": "Capstone Copper",
            "price": 4.45,
            "changePercent": 4.8,
            "changePrice": 0.2,
            "rank": 51
        },
        {
            "symbol": "WRB-PE",
            "stockTitle": "W.R. Berkley Corporation 5.70% ",
            "price": 24.68,
            "changePercent": 4.8,
            "changePrice": 1.13,
            "rank": 52
        },
        {
            "symbol": "MQ",
            "stockTitle": "Marqeta",
            "price": 4.16,
            "changePercent": 4.8,
            "changePrice": 0.19,
            "rank": 53
        },
        {
            "symbol": "DNNGY",
            "stockTitle": "ORSTED A/S UNSP ADR EACH REPR 0",
            "price": 28.1,
            "changePercent": 4.8,
            "changePrice": 1.28,
            "rank": 54
        },
        {
            "symbol": "ALC",
            "stockTitle": "Alcon",
            "price": 70.8,
            "changePercent": 4.8,
            "changePrice": 3.22,
            "rank": 55
        },
        {
            "symbol": "GETY",
            "stockTitle": "Getty Images",
            "price": 5.1,
            "changePercent": 4.7,
            "changePrice": 0.23,
            "rank": 56
        },
        {
            "symbol": "PSNYW",
            "stockTitle": "Polestar Automotive Holding UK",
            "price": 0.77,
            "changePercent": 4.7,
            "changePrice": 0.03,
            "rank": 57
        },
        {
            "symbol": "FRC-PH",
            "stockTitle": "FIRST REPUBLIC BANK Depositary ",
            "price": 6.15,
            "changePercent": 4.6,
            "changePrice": 0.27,
            "rank": 58
        },
        {
            "symbol": "OSH",
            "stockTitle": "Oak Street Health",
            "price": 38.7,
            "changePercent": 4.6,
            "changePrice": 1.69,
            "rank": 59
        },
        {
            "symbol": "MPW",
            "stockTitle": "Medical Properties Trust",
            "price": 8.04,
            "changePercent": 4.6,
            "changePrice": 0.35,
            "rank": 60
        },
        {
            "symbol": "SSEZY",
            "stockTitle": "SSE PLC SPON ADR REP 1 ORD GBP0",
            "price": 22.36,
            "changePercent": 4.5,
            "changePrice": 0.97,
            "rank": 61
        },
        {
            "symbol": "EBKDY",
            "stockTitle": "ERSTE GROUP BANK AG ADR EACH RE",
            "price": 16.82,
            "changePercent": 4.5,
            "changePrice": 0.73,
            "rank": 62
        },
        {
            "symbol": "MAKSY",
            "stockTitle": "MARKS & SPENCER GROUP SPON ADR ",
            "price": 4.19,
            "changePercent": 4.5,
            "changePrice": 0.18,
            "rank": 63
        },
        {
            "symbol": "RAIFY",
            "stockTitle": "RAIFFEISEN BANK INTERNATIONAL U",
            "price": 3.82,
            "changePercent": 4.5,
            "changePrice": 0.16,
            "rank": 64
        },
        {
            "symbol": "LU",
            "stockTitle": "Lufax Holding",
            "price": 2.12,
            "changePercent": 4.4,
            "changePrice": 0.09,
            "rank": 65
        },
        {
            "symbol": "ASAI",
            "stockTitle": "Sendas Distribuidora",
            "price": 15.69,
            "changePercent": 4.4,
            "changePrice": 0.66,
            "rank": 66
        },
        {
            "symbol": "ZBRA",
            "stockTitle": "Zebra",
            "price": 309.11,
            "changePercent": 4.4,
            "changePrice": 12.99,
            "rank": 67
        },
        {
            "symbol": "YY",
            "stockTitle": "JOYY",
            "price": 31.77,
            "changePercent": 4.4,
            "changePrice": 1.33,
            "rank": 68
        },
        {
            "symbol": "BBD",
            "stockTitle": "Banco Bradesco",
            "price": 2.63,
            "changePercent": 4.4,
            "changePrice": 0.11,
            "rank": 69
        },
        {
            "symbol": "ATH-PA",
            "stockTitle": "Athene Holding Ltd. Depositary ",
            "price": 22.03,
            "changePercent": 4.3,
            "changePrice": 0.9,
            "rank": 70
        },
        {
            "symbol": "HMY",
            "stockTitle": "Harmony Gold Mining Company",
            "price": 4.18,
            "changePercent": 4.2,
            "changePrice": 0.17,
            "rank": 71
        },
        {
            "symbol": "ICAGY",
            "stockTitle": "INTERNATIONAL CONSOLIDATED AIRL",
            "price": 3.64,
            "changePercent": 4.2,
            "changePrice": 0.15,
            "rank": 72
        },
        {
            "symbol": "UBSFY",
            "stockTitle": "UBISOFT ENTERTAINMENT UNSP ADR ",
            "price": 5.2,
            "changePercent": 4.2,
            "changePrice": 0.21,
            "rank": 73
        },
        {
            "symbol": "GMED",
            "stockTitle": "Globus Medical",
            "price": 55.72,
            "changePercent": 4.2,
            "changePrice": 2.25,
            "rank": 74
        },
        {
            "symbol": "IOT",
            "stockTitle": "Samsara",
            "price": 19.49,
            "changePercent": 4.2,
            "changePrice": 0.78,
            "rank": 75
        },
        {
            "symbol": "BABAF",
            "stockTitle": "Alibaba Group Holding",
            "price": 13,
            "changePercent": 4.2,
            "changePrice": 0.52,
            "rank": 76
        },
        {
            "symbol": "BSBR",
            "stockTitle": "Banco Santander (Brasil)",
            "price": 5.3,
            "changePercent": 4.1,
            "changePrice": 0.21,
            "rank": 77
        },
        {
            "symbol": "FORM",
            "stockTitle": "FormFactor",
            "price": 31.43,
            "changePercent": 4.1,
            "changePrice": 1.24,
            "rank": 78
        },
        {
            "symbol": "ENIC",
            "stockTitle": "Enel Chile",
            "price": 2.56,
            "changePercent": 4.1,
            "changePrice": 0.1,
            "rank": 79
        },
        {
            "symbol": "RNW",
            "stockTitle": "ReNew Energy Global",
            "price": 5.65,
            "changePercent": 4.1,
            "changePrice": 0.22,
            "rank": 80
        },
        {
            "symbol": "ENVX",
            "stockTitle": "Enovix",
            "price": 14.2,
            "changePercent": 4,
            "changePrice": 0.55,
            "rank": 81
        },
        {
            "symbol": "LGF-B",
            "stockTitle": "Lions Gate Entertainment Corpor",
            "price": 9.89,
            "changePercent": 4,
            "changePrice": 0.38,
            "rank": 82
        },
        {
            "symbol": "GGB",
            "stockTitle": "Gerdau",
            "price": 4.96,
            "changePercent": 4,
            "changePrice": 0.19,
            "rank": 83
        },
        {
            "symbol": "HOOD",
            "stockTitle": "Robinhood Markets",
            "price": 9.46,
            "changePercent": 4,
            "changePrice": 0.36,
            "rank": 84
        },
        {
            "symbol": "LGF-A",
            "stockTitle": "Lions Gate Entertainment",
            "price": 10.52,
            "changePercent": 4,
            "changePrice": 0.4,
            "rank": 85
        },
        {
            "symbol": "BHPLF",
            "stockTitle": "BHP GROUP LTD",
            "price": 31.5,
            "changePercent": 3.9,
            "changePrice": 1.19,
            "rank": 86
        },
        {
            "symbol": "ITVPY",
            "stockTitle": "ITV UNSP ADR EACH REPR 10 ORD",
            "price": 10.39,
            "changePercent": 3.9,
            "changePrice": 0.39,
            "rank": 87
        },
        {
            "symbol": "GRFS",
            "stockTitle": "Grifols, S.A.",
            "price": 7.47,
            "changePercent": 3.9,
            "changePrice": 0.28,
            "rank": 88
        },
        {
            "symbol": "SVNLY",
            "stockTitle": "SVENSKA HANDELSBANKEN AB ADR EA",
            "price": 4.3,
            "changePercent": 3.9,
            "changePrice": 0.16,
            "rank": 89
        },
        {
            "symbol": "BYDDF",
            "stockTitle": "BYD Company",
            "price": 29.25,
            "changePercent": 3.9,
            "changePrice": 1.09,
            "rank": 90
        },
        {
            "symbol": "MPNGY",
            "stockTitle": "MEITUAN",
            "price": 37.24,
            "changePercent": 3.8,
            "changePrice": 1.38,
            "rank": 91
        },
        {
            "symbol": "CIM-PB",
            "stockTitle": "Chimera Investment Corporation ",
            "price": 19.71,
            "changePercent": 3.8,
            "changePrice": 0.73,
            "rank": 92
        },
        {
            "symbol": "CFLT",
            "stockTitle": "Confluent",
            "price": 22.72,
            "changePercent": 3.8,
            "changePrice": 0.83,
            "rank": 93
        },
        {
            "symbol": "DOCN",
            "stockTitle": "DigitalOcean",
            "price": 36.8,
            "changePercent": 3.8,
            "changePrice": 1.34,
            "rank": 94
        },
        {
            "symbol": "CTTAY",
            "stockTitle": "CONTINENTAL AG SPON ADS EACH RE",
            "price": 7.43,
            "changePercent": 3.8,
            "changePrice": 0.27,
            "rank": 95
        },
        {
            "symbol": "BYDDY",
            "stockTitle": "BYD COMPANY LIMITED UNSP ADR EA",
            "price": 58.43,
            "changePercent": 3.8,
            "changePrice": 2.12,
            "rank": 96
        },
        {
            "symbol": "KSS",
            "stockTitle": "Kohl's",
            "price": 22.88,
            "changePercent": 3.8,
            "changePrice": 0.83,
            "rank": 97
        },
        {
            "symbol": "ASAZF",
            "stockTitle": "ASSA ABLOY",
            "price": 23.78,
            "changePercent": 3.8,
            "changePrice": 0.86,
            "rank": 98
        },
        {
            "symbol": "CZR",
            "stockTitle": "Caesars Entertainment",
            "price": 46.87,
            "changePercent": 3.7,
            "changePrice": 1.69,
            "rank": 99
        },
        {
            "symbol": "MTSFY",
            "stockTitle": "MITSUI FUDOSAN UNSP ADR EACH RE",
            "price": 56.44,
            "changePercent": 3.7,
            "changePrice": 2,
            "rank": 100
        }
    ]


}

const RankText = styled.text`

  
    font-size: 20px;

    font-family: Pretendard;
    font-weight: 500;
`;

const RankTitleText = styled.text`

  
    font-size: 18px;

    font-family: Pretendard;
    font-weight: 400;
`;

const RankPriceText = styled.text`

    text-align: right;
    font-size: 16px;

    font-family: Pretendard;
    font-weight: 400;
`;