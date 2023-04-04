import React, {useEffect, useState} from "react";


// @ts-ignore
import {PieChart, ResponsiveContainer, Cell, Pie, PolarAngleAxis} from "recharts";
import StockTrendTypes from "../../../types/StockTrendTypes";
import {useNavigate} from "react-router-dom";
import StockNewsTypes from "../../../types/StockNewsTypes";
import detailInfoService from "../../../services/detailInfoService";
import Loader from "../../../components/Loader";
import ErrorView from "./ErrorView";
import ZeroAnswerView from "./ZeroAnswerView";
import NotSupportView from "./NotSupportView";

interface Props {
    symbol:string;
    period : string;
}

export default function TrendPieChart ({symbol, period}:Props){
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [notSupportStatus, setNotSupportStatus] = useState(false);
    const [graphData, setGraphData] = useState<StockTrendTypes[]|null>(null);

    //stockInfo(view카드)
    const getRecommendTrend =
        (stockId: string, period:string) => {

            setLoading(true);
            // 이 페이지에서는 all로 간다
            detailInfoService.getRecommendedTrend(stockId,period)
                .then( res => {

                    setLoading(false);

                    if(res.data.status.status === "E000"){
                        // @ts-ignore
                        setGraphData(res.data.result);
                    }
                    else if(res.data.status.status === "E904"){
                        setNotSupportStatus(true);
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
        getRecommendTrend(symbol,period)
    },[period]);


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
                                                    <>
                                                        {
                                                            notSupportStatus ?

                                                                (
                                                                    <NotSupportView/>
                                                                )
                                                                :
                                                                (
                                                                    graphData &&

                                                                    <>
                                                                        {
                                                                            graphData.length===0 ?
                                                                                (
                                                                                    <ZeroAnswerView/>
                                                                                )
                                                                                :
                                                                                    (
                                                                                        <ResponsiveContainer>
                                                                                            <PieChart height={260}>
                                                                                                {/*dataKey: 써있는 값*/}
                                                                                                <Pie data={graphData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={(data) => (data.id)}>
                                                                                                    {
                                                                                                        data.map((entry, index) => (
                                                                                                            <Cell key={`cell-${index}`} fill={entry.color}/>
                                                                                                        ))
                                                                                                    }
                                                                                                </Pie>
                                                                                                <PolarAngleAxis></PolarAngleAxis>
                                                                                            </PieChart>
                                                                                        </ResponsiveContainer>
                                                                                    )
                                                                        }
                                                                    </>
                                                                )

                                                        }
                                                    </>
                                    )
                            }
                        </>
                    )
            }
        </>
    );
}


const data : StockTrendTypes[] = [
    {
        "id": "Strong Buy",
        "value": 11,
        "color": "#F56C3B"
    },
    {
        "id": "Buy",
        "value": 21,
        "color": "#FEF0EB"
    },
    {
        "id": "Hold",
        "value": 6,
        "color": "#E9E9E9"
    }

]