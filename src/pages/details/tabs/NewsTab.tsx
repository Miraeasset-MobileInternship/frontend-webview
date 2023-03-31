import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


import StockNewsTypes from "../../../types/StockNewsTypes";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import CompanyInfoTypes from "../../../types/CompanyInfoTypes";
import detailInfoService from "../../../services/detailInfoService";
import Loader from "../../../components/Loader";
import ErrorView from "../components/ErrorView";
import ZeroAnswerView from "../components/ZeroAnswerView";

const style = {
    width: '100%',
    maxWidth: '100%',
    bgcolor: 'background.paper',
};


interface Props {
    symbol:string;
}

export default function NewsTab({symbol}:Props) {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [newsList, setNewsList] = useState<StockNewsTypes|null>(null);

    //stockInfo(view카드)
    const getNewsList =
        (stockId: string) => {

            setLoading(true);
            // 이 페이지에서는 all로 간다
            detailInfoService.getStockNews(stockId,"all")
                .then( res => {

                    setLoading(false);

                    if(res.data.status.status === "E000"){
                        // @ts-ignore
                        setNewsList(res.data.result);
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
        getNewsList(symbol)
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
                                   newsList &&
                                   <>
                                       {
                                           newsList.totalData === 0 ?
                                               (
                                                   <ZeroAnswerView/>
                                               )
                                               :
                                                   (
                                                       <>
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
                                                       </>
                                                   )

                                       }
                               </>)
                    }
                    </>
                )
        }
        </>
    );
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
        {
            "link": "https://finance.yahoo.com/m/32f56266-3093-30eb-af5a-129589ac6b7f/this-is-warren-buffett%27s-no..html?.tsrc=rss",
            "title": "This Is Warren Buffett's No. 1 Stock to Buy During a Bear Market",
            "date": "2hours ago"
        },
        {
            "link": "https://finance.yahoo.com/news/apple-gangnam-welcome-first-customers-230000658.html?.tsrc=rss",
            "title": "Apple Gangnam will welcome first customers this Friday, March 31 in South Korea",
            "date": "12hours ago"
        },
        {
            "link": "https://finance.yahoo.com/m/eef68d53-c0a1-38f5-ab8a-c9cdf8348ec7/apple-launches-apple-pay.html?.tsrc=rss",
            "title": "Apple Launches Apple Pay Later in the US",
            "date": "12hours ago"
        },
        {
            "link": "https://finance.yahoo.com/news/apple-starts-roll-pay-later-214437026.html?.tsrc=rss",
            "title": "Apple Starts to Roll Out ‘Pay Later’ Service After Delay",
            "date": "14hours ago"
        },
        {
            "link": "https://finance.yahoo.com/m/80e038eb-73e4-31f2-8ec4-32484425742b/apple-rolls-out-buy-now%2C-pay.html?.tsrc=rss",
            "title": "Apple Rolls Out Buy Now, Pay Later Plan",
            "date": "15hours ago"
        },
        {
            "link": "https://finance.yahoo.com/m/227e2cba-0e3e-3510-b0e4-33032e87a8f6/apple-advertising-business-is.html?.tsrc=rss",
            "title": "Apple Advertising Business Is Underappreciated, Analyst Says",
            "date": "15hours ago"
        },
        {
            "link": "https://finance.yahoo.com/video/apple-pay-later-debuts-u-195132954.html?.tsrc=rss",
            "title": "‘Apple Pay Later’ debuts in U.S. with no interest, no fees guarantee",
            "date": "15hours ago"
        },
        {
            "link": "https://www.independent.co.uk/tech/apple-music-classical-launch-streaming-b2309705.html?.tsrc=rss",
            "title": "Apple Music Classical: iPhone maker launches new streaming service focused on orchestral music",
            "date": "16hours ago"
        },
        {
            "link": "https://finance.yahoo.com/news/affirm-shares-falling-due-apple-182014763.html?.tsrc=rss",
            "title": "Affirm Shares Are Falling Due To Apple: Here's Why The Stock Is Reacting",
            "date": "17hours ago"
        },
        {
            "link": "https://finance.yahoo.com/m/63e2f4d4-c6ac-3647-9f89-4f7523c8c098/apple-launches-%E2%80%98buy-now%2C-pay.html?.tsrc=rss",
            "title": "Apple launches ‘buy now, pay later’ service in the US",
            "date": "18hours ago"
        },
        {
            "link": "https://finance.yahoo.com/video/apple-introduces-apple-pay-later-161633092.html?.tsrc=rss",
            "title": "Apple introduces Apple Pay Later, Microsoft unveils AI-powered cybersecurity platform",
            "date": "19hours ago"
        },
        {
            "link": "https://finance.yahoo.com/news/apple-launches-apple-pay-later-buy-now-pay-later-program-160846944.html?.tsrc=rss",
            "title": "Apple launches 'Apple Pay Later' buy-now, pay-later program",
            "date": "19hours ago"
        },
        {
            "link": "https://finance.yahoo.com/news/stock-market-today-dow-dips-160758837.html?.tsrc=rss",
            "title": "Stock market today: Dow dips to close lower as tech tumble weighs",
            "date": "19hours ago"
        },
        {
            "link": "https://finance.yahoo.com/news/1-apple-launches-buy-now-154513830.html?.tsrc=rss",
            "title": "UPDATE 4-Apple launches 'buy now, pay later' service in US",
            "date": "20hours ago"
        },
        {
            "link": "https://finance.yahoo.com/news/apple-launches-buy-now-pay-153810032.html?.tsrc=rss",
            "title": "Apple launches 'buy now, pay later' service in US",
            "date": "20hours ago"
        },
        {
            "link": "https://finance.yahoo.com/news/p-500-dips-tech-drag-153745552.html?.tsrc=rss",
            "title": "S&P 500 dips on tech drag as yields rise on easing bank jitters, upbeat consumer",
            "date": "20hours ago"
        }
    ]
};