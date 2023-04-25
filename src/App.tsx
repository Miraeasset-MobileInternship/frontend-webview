import React, {useEffect, useState} from 'react';
// import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";



//import pages (for Route)
import DetailPage from './pages/details/index';
import RankPage from "./pages/rank";
import ErrorPage from "./pages/errors";

import BuyPage from "./pages/buy";
import SellPage from "./pages/sell";
import StockSuccessPage from "./pages/errors/stocks/success";
import StockErrorPage from "./pages/errors/stocks/error";
import NotExistPage from "./pages/errors/NotExistPage";
import LandingPage from "./pages/index";
import Header from "./components/Header";

function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/:stockId" element={<DetailPage/>}/>
                <Route path="/ranking" element={<RankPage/>}/>
                <Route path="/error" element={<ErrorPage/>}/>
                <Route path="/not-exist" element={<NotExistPage/>}/>
                <Route path="/:stockId/buy" element={<BuyPage/>}/>
                <Route path="/:stockId/sell" element={<SellPage/>}/>
                <Route path="/:stockId/stock-success" element={<StockSuccessPage/>}/>
                <Route path="/:stockId/stock-error" element={<StockErrorPage/>}/>
            </Routes>
        </div>
    );
}

export default App;

