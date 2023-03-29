import react from 'react';
import PriceLineChart from "./components/PriceLineChart";
import React from "react";

export default function ChartPage() {
    //Tab
    const [period, setPeriod] = React.useState('1d');



    return (
        <div style={{height: '100%'}}>
            <PriceLineChart period={'1d'}/>
            <div>

            </div>
        </div>
    );
}

