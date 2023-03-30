import React from "react";


// @ts-ignore
import {PieChart, ResponsiveContainer, Cell, Pie, PolarAngleAxis} from "recharts";
import StockTrendTypes from "../../../types/StockTrendTypes";

interface Props {
    period : string;
}

export default function TrendPieChart ({period}:Props){


    return (
        <ResponsiveContainer>
            <PieChart height={260}>
                {/*dataKey: 써있는 값*/}
                <Pie data={data} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={(data) => (data.id)}>
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color}/>
                        ))
                    }
                </Pie>
                <PolarAngleAxis></PolarAngleAxis>
            </PieChart>
        </ResponsiveContainer>
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