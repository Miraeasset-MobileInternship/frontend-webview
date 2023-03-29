import StockDetailTypes from "../../../types/StockDetailTypes";
import styled, {css} from 'styled-components';
import React from "react";
import {useEffect} from "react";

// @ts-ignore
import {LineChart, CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";
import {now} from "lodash";
import StockPriceGraphData from "../../../types/StockPriceGraphData";

interface Props {
    period : string;
}

export default function PriceLineChart ({period}:Props){

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
        <ResponsiveContainer>
        <LineChart data={stockGraphData.data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <XAxis dataKey="time" hide={true} type="number" domain={[stockGraphData.dateInfo.minDate, stockGraphData.dateInfo.maxDate]}/>
            <YAxis dataKey="price" type="number" domain={[stockGraphData.priceInfo.minPrice, stockGraphData.priceInfo.maxPrice]} hide={true}/>
            <Tooltip
                separator={""}
                formatter={(value,name,props) => [value,""]}
                labelFormatter={label => toDate(label, period)}


            />
            <Line type="linear" dataKey="price" stroke="#8884d8" dot={false} strokeWidth={2}/>
        </LineChart>
        </ResponsiveContainer>
    );
}


const TextBox = styled.div`
  


`;

// @ts-ignore
const TagText = styled.text`
  



`;


const stockGraphData: StockPriceGraphData = {

    symbol: 'AAPL',
    period:'1d',
    dateInfo:{
        maxDate: 1672929000,
        minDate: 1672324200,
    },
    priceInfo:{
        maxPrice: 130,
        minPrice: 125,
    },
    data : [
        {
            "time": 1672324200,
            "price": 129.61,
        },
        {
            "time": 1672410600,
            "price": 129.93,
        },
        {
            "time": 1672756200,
            "price": 125.07,
        },
        {
            "time": 1672842600,
            "price": 126.36,
        },
        {
            "time": 1672929000,
            "price": 125.02,
        },
    ],



};
