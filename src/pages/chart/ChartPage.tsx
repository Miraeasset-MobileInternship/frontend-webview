
import react, {useState} from 'react';
import PriceLineChart from "./components/PriceLineChart";

import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export default function ChartPage() {
    const [period, setperiod] = useState('1d');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newperiod: string,
    ) => {
        setperiod(newperiod);
    };


    return (
        <div style={{height: "100%", display: 'flex', flexDirection: 'column', overflowY: "hidden"}}>
            <div style={{height:"90%"}}>
                <PriceLineChart period={period} />
            </div>
            <div style={{height:"10%"}}>
                <ToggleButtonGroup
                    color="primary"
                    value={period}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    fullWidth={true}
                >
                    <ToggleButton value="1d">1일</ToggleButton>
                    <ToggleButton value="5d">1주</ToggleButton>
                    <ToggleButton value="3mo">3달</ToggleButton>
                    <ToggleButton value="1y">1년</ToggleButton>
                    <ToggleButton value="5y">5년</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    );
}

