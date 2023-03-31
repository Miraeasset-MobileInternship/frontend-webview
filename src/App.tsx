import React, {useEffect, useState} from 'react';
import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";



//import pages (for Route)
import DetailPage from './pages/details/index';
import RankPage from "./pages/rank";




function App() {

  return (
      <Routes>
        <Route path="/" element={<DetailPage/>}/>
        <Route path="/ranking" element={<RankPage/>}/>
      </Routes>
  );
}

export default App;

