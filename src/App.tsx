import React, {useEffect, useState} from 'react';
import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";



//import pages (for Route)
import DetailPage from './pages/details/index';
import RankPage from "./pages/rank";
import ErrorPage from "./pages/errors";
import BuyPage from "./pages/buy";
import SellPage from "./pages/sell";




function App() {

  return (
      <Routes>
        <Route path="/" element={<DetailPage/>}/>
        <Route path="/ranking" element={<RankPage/>}/>
        <Route path="/error" element={<ErrorPage/>}/>
        <Route path="/buy" element={<BuyPage/>}/>
        <Route path="/sell" element={<SellPage/>}/>
      </Routes>
  );
}

export default App;

