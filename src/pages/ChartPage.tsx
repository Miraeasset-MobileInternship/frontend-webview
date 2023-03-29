import react from 'react';
import PriceLineChart from "../components/PriceLineChart";

export default function ChartPage() {
    return (
        <div style={{height: '100%'}}>
            <PriceLineChart period={'1d'}/>
        </div>
    );
}