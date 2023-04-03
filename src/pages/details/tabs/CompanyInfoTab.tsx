import react, {useEffect, useState} from 'react';
import List from "@mui/material/List";
import {ListItem, ListItemText} from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TrendPieChart from "../components/TrendPieChart";
import CardView from "../components/CardView";
import * as React from "react";
import CompanyInfoTypes from "../../../types/CompanyInfoTypes";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import StockPriceGraphData from "../../../types/StockPriceGraphData";
import detailInfoService from "../../../services/detailInfoService";
import Loader from "../../../components/Loader";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ErrorPage from "../../errors";
import ErrorView from "../components/ErrorView";

interface Props {
    symbol:string;
}

export default function CompanyInfoTab({symbol}:Props) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfoTypes|null>(null);

    //stockInfo(view카드)
    const getCompanyInfo =
        (stockId: string) => {

            setLoading(true);
            detailInfoService.getCompanyInfo(stockId)
                .then( res => {

                    setLoading(false);

                    if(res.data.status.status === "E000"){
                        // @ts-ignore
                        setCompanyInfo(res.data.result);
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
        getCompanyInfo(symbol)
    },[]);



    return (
        <>
        {
            loading?
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
                                    companyInfo &&
                                        <>
                                            <div style={{height: '100%', overflowY : "scroll"}}>
                                                <div style={{height: 'fit-content', paddingTop: 5, paddingBottom: 5, }}>
                                                    <div style={{height: '30px',}}>
                                                        <TitleText>{'기업 정보'}</TitleText>
                                                    </div>
                                                    <div style={{padding: 10 ,}}>
                                                        <List sx={{ width: '100%', bgcolor: 'background.paper', }}>
                                                            <ListItem
                                                                key={companyInfo.address}
                                                                disableGutters
                                                                secondaryAction={
                                                                    <ListItemText primary={companyInfo.address} sx={{width: '60vw', flexWrap:'wrap',wordWrap: 'break-word', textAlign:'right'}} />
                                                                }
                                                                style={{height: 'fit-content', }}
                                                            >
                                                                <ListItemText secondary={"Address"}/>
                                                            </ListItem>
                                                            <ListItem
                                                                key={companyInfo.address}
                                                                disableGutters
                                                                secondaryAction={
                                                                    <ListItemText primary={companyInfo.country} sx={{width: '60vw', flexWrap:'wrap',wordWrap: 'break-word', textAlign:'right'}} />
                                                                }
                                                                style={{height: 'fit-content', }}
                                                            >
                                                                <ListItemText secondary={"Country"}/>
                                                            </ListItem>
                                                            <ListItem
                                                                key={companyInfo.address}
                                                                disableGutters
                                                                secondaryAction={
                                                                    <ListItemText primary={companyInfo.phoneNumber} sx={{width: '60vw', flexWrap:'wrap',wordWrap: 'break-word', textAlign:'right'}} />
                                                                }
                                                                style={{height: 'fit-content', }}
                                                            >
                                                                <ListItemText secondary={"Contact"}/>
                                                            </ListItem>
                                                            <ListItem
                                                                key={companyInfo.address}
                                                                disableGutters
                                                                secondaryAction={
                                                                    <ListItemText primary={companyInfo.industry} sx={{width: '60vw', flexWrap:'wrap',wordWrap: 'break-word', textAlign:'right'}} />
                                                                }
                                                                style={{height: 'fit-content', }}
                                                            >
                                                                <ListItemText secondary={"Industry"}/>
                                                            </ListItem>
                                                            <ListItem
                                                                key={companyInfo.address}
                                                                disableGutters
                                                                secondaryAction={
                                                                    <ListItemText primary={companyInfo.sector} sx={{width: '60vw', flexWrap:'wrap',wordWrap: 'break-word', textAlign:'right'}} />
                                                                }
                                                                style={{height: 'fit-content', }}
                                                            >
                                                                <ListItemText secondary={"Sector"}/>
                                                            </ListItem>
                                                            <ListItem
                                                                key={companyInfo.address}
                                                                disableGutters
                                                                secondaryAction={
                                                                    <ListItemText primary={companyInfo.ceo} sx={{width: '60vw', flexWrap:'wrap',wordWrap: 'break-word', textAlign:'right'}} />
                                                                }
                                                                style={{height: 'fit-content',}}
                                                            >
                                                                <ListItemText secondary={"CEO"}/>
                                                            </ListItem>
                                                            <ListItem
                                                                key={companyInfo.address}
                                                                disableGutters
                                                                secondaryAction={
                                                                    <ListItemText primary={companyInfo.employees} sx={{width: '60vw', flexWrap:'wrap',wordWrap: 'break-word', textAlign:'right'}} />
                                                                }
                                                                style={{height: 'fit-content', }}
                                                            >
                                                                <ListItemText secondary={"The number of Employees"}/>
                                                            </ListItem>
                                                            <ListItem
                                                                key={companyInfo.address}
                                                                disableGutters
                                                                secondaryAction={
                                                                    <Link to={`${companyInfo.website}`} style={{ textDecoration: "none" , color: 'black'}}>
                                                                        <ListItemText primary={companyInfo.website} sx={{width: '60vw', flexWrap:'wrap',wordWrap: 'break-word', textAlign:'right'}} />
                                                                    </Link>
                                                                }
                                                                style={{height: 'fit-content',}}
                                                            >
                                                                <ListItemText secondary={"Website"}/>
                                                            </ListItem>
                                                        </List>
                                                    </div>
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


// const companyInfo: CompanyInfoTypes = {
//
//     "address": "One Apple Park Way, Cupertino, CA 95014",
//     "country": "United States",
//     "phoneNumber": "408 996 1010",
//     "website": "https://www.apple.com",
//     "industry": "Consumer Electronics",
//     "sector": "Technology",
//     "employees": "164000",
//     "ceo": "Mr. Timothy D. Cook",
//     "businessSummary": "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. It also provides AppleCare support and cloud services; and operates various platforms, including the App Store that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts. In addition, the company offers various services, such as Apple Arcade, a game subscription service; Apple Fitness+, a personalized fitness service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It distributes third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was incorporated in 1977 and is headquartered in Cupertino, California."
// }
