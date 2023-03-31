
import styled, {css} from 'styled-components';
import React, {useEffect, useState} from "react";

import {LineChart,Line, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";

import StockPriceGraphData from "../../../types/StockPriceGraphData";
import detailInfoService from "../../../services/detailInfoService";
import {useNavigate} from "react-router-dom";
import Loader from "../../../components/Loader";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ErrorView from "./ErrorView";

interface Props {
    period : string;
    symbol:string;
}

export default function PriceLineChart ({symbol,period}:Props){
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [stockGraphData, setStockGraphData] = useState<StockPriceGraphData|null>(null);

    //stockInfo(view카드)
    const getGraphData =
        (stockId: string) => {

            setLoading(true);
            detailInfoService.getChartData(period,stockId)
                .then( res => {

                    setLoading(false);

                    if(res.data.status.status === "E000"){
                        //@ts-ignore
                        setStockGraphData(res.data.result);
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
        getGraphData(symbol)
    },[period]);



    //second로 된 날짜 형식을 날짜 형식으로 리턴
    function toDate(second : number, period:string) {
        /*
        1일/1주 -> yyyy.m.dd hh:mm 형식
        3달/1년/5년 -> yyyy.m.dd형식
         */
        const date = new Date(second*1000);

        const dateString = date.getFullYear()+"."+(date.getMonth()+1)+"."+date.getDate();

        if(period === '1d' || period === '5d'){
            const timeString = date.getHours()+":"+date.getMinutes();
            return dateString+" "+timeString;
        }else{
            return dateString;
        }

    }



    return (
        <>
        {loading ?
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
                                    stockGraphData &&
                                    <>
                                        <ResponsiveContainer>
                                            <LineChart data={stockGraphData.data} margin={{top: 5, right: 10, left: 10, bottom: 5}}>
                                                <XAxis dataKey="time" hide={true} type="number"
                                                       domain={[stockGraphData.dateInfo.minDate, stockGraphData.dateInfo.maxDate]}/>
                                                <YAxis dataKey="price" type="number"
                                                       domain={[stockGraphData.priceInfo.minPrice, stockGraphData.priceInfo.maxPrice]}
                                                       hide={true}/>
                                                <Tooltip
                                                    separator={""}
                                                    formatter={(value, name, props) => [value, ""]}
                                                    labelFormatter={label => toDate(label, period)}
                                                />
                                                <Line type="linear" dataKey="price" stroke="#8884d8" dot={false} strokeWidth={2}/>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </>

                                )
                        }
                    </>
                )
            }
        </>
    )
}



const ErrorText = styled.text`


  font-size: 16px;

  color: #A3A5A7;
  text-align: center;
  font-family: Pretendard;
  font-weight: 400;
  
`;



const stockGraphData: StockPriceGraphData = {

    "symbol": "AAPL",
    "period": "3mo",
    "dateInfo": {
        "maxDate": 1680010200,
        "minDate": 1672324200
    },
    "priceInfo": {
        "maxPrice": 161,
        "minPrice": 126
    },
    "data": [
        {
            "time": 1672324200,
            "price": 129.61
        },
        {
            "time": 1672410600,
            "price": 129.93
        },
        {
            "time": 1672756200,
            "price": 125.07
        },
        {
            "time": 1672842600,
            "price": 126.36
        },
        {
            "time": 1672929000,
            "price": 125.02
        },
        {
            "time": 1673015400,
            "price": 129.62
        },
        {
            "time": 1673274600,
            "price": 130.15
        },
        {
            "time": 1673361000,
            "price": 130.73
        },
        {
            "time": 1673447400,
            "price": 133.49
        },
        {
            "time": 1673533800,
            "price": 133.41
        },
        {
            "time": 1673620200,
            "price": 134.76
        },
        {
            "time": 1673965800,
            "price": 135.94
        },
        {
            "time": 1674052200,
            "price": 135.21
        },
        {
            "time": 1674138600,
            "price": 135.27
        },
        {
            "time": 1674225000,
            "price": 137.87
        },
        {
            "time": 1674484200,
            "price": 141.11
        },
        {
            "time": 1674570600,
            "price": 142.53
        },
        {
            "time": 1674657000,
            "price": 141.86
        },
        {
            "time": 1674743400,
            "price": 143.96
        },
        {
            "time": 1674829800,
            "price": 145.93
        },
        {
            "time": 1675089000,
            "price": 143
        },
        {
            "time": 1675175400,
            "price": 144.29
        },
        {
            "time": 1675261800,
            "price": 145.43
        },
        {
            "time": 1675348200,
            "price": 150.82
        },
        {
            "time": 1675434600,
            "price": 154.5
        },
        {
            "time": 1675693800,
            "price": 151.73
        },
        {
            "time": 1675780200,
            "price": 154.65
        },
        {
            "time": 1675866600,
            "price": 151.92
        },
        {
            "time": 1675953000,
            "price": 150.87
        },
        {
            "time": 1676039400,
            "price": 151.01
        },
        {
            "time": 1676298600,
            "price": 153.85
        },
        {
            "time": 1676385000,
            "price": 153.2
        },
        {
            "time": 1676471400,
            "price": 155.33
        },
        {
            "time": 1676557800,
            "price": 153.71
        },
        {
            "time": 1676644200,
            "price": 152.55
        },
        {
            "time": 1676989800,
            "price": 148.48
        },
        {
            "time": 1677076200,
            "price": 148.91
        },
        {
            "time": 1677162600,
            "price": 149.4
        },
        {
            "time": 1677249000,
            "price": 146.71
        },
        {
            "time": 1677508200,
            "price": 147.92
        },
        {
            "time": 1677594600,
            "price": 147.41
        },
        {
            "time": 1677681000,
            "price": 145.31
        },
        {
            "time": 1677767400,
            "price": 145.91
        },
        {
            "time": 1677853800,
            "price": 151.03
        },
        {
            "time": 1678113000,
            "price": 153.83
        },
        {
            "time": 1678199400,
            "price": 151.6
        },
        {
            "time": 1678285800,
            "price": 152.87
        },
        {
            "time": 1678372200,
            "price": 150.59
        },
        {
            "time": 1678458600,
            "price": 148.5
        },
        {
            "time": 1678714200,
            "price": 150.47
        },
        {
            "time": 1678800600,
            "price": 152.59
        },
        {
            "time": 1678887000,
            "price": 152.99
        },
        {
            "time": 1678973400,
            "price": 155.85
        },
        {
            "time": 1679059800,
            "price": 155
        },
        {
            "time": 1679319000,
            "price": 157.4
        },
        {
            "time": 1679405400,
            "price": 159.28
        },
        {
            "time": 1679491800,
            "price": 157.83
        },
        {
            "time": 1679578200,
            "price": 158.93
        },
        {
            "time": 1679664600,
            "price": 160.25
        },
        {
            "time": 1679923800,
            "price": 158.28
        },
        {
            "time": 1680010200,
            "price": 157.65
        }
    ]



};