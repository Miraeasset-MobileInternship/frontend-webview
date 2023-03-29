import StockDetailTypes from "../types/StockDetailTypes";
import styled, {css} from 'styled-components';
import React from "react";
import {useEffect} from "react";

// @ts-ignore
import {LineChart, CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";
import {now} from "lodash";

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
        <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {/*<CartesianGrid strokeDasharray="3 3" />*/}
            <XAxis dataKey="time" hide={true} type="number" domain={[1672324200, 1672929000]}/>
            <YAxis dataKey="price" type="number" domain={[125,130]} hide={true}/>
            <Tooltip
                separator={""}
                formatter={(value,name,props) => [value,""]}
                labelFormatter={label => toDate(label, period)}


            />
            {/*<Legend />*/}
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



const data = [
    {
        // "time": "Page A",
        "time": 1672324200,
        "price": 129.61,
        "amt": 2400
    },
    {
        // "time": "Page B",
        "time": 1672410600,
        "price": 129.93,
        "amt": 2210
    },
    {
        // "time": "Page C",
        "time": 1672756200,
        "price": 125.07,
        "amt": 2290
    },
    {
        // "time": "Page D",
        "time": 1672842600,
        "price": 126.36,
        "amt": 2000
    },
    {
        // "time": "Page E",
        "time": 1672929000,
        "price": 125.02,
        "amt": 2181
    },
];
