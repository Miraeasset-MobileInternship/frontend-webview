import React, {useEffect, useState} from 'react';
import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {debounce} from "lodash";


//import pages (for Route)
import DetailInfoPage from "./pages/DetailInfoPage";
import TmpPage from "./pages/ChartPage";








function App() {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const handleResize = debounce(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }, 200);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            // cleanup
            window.removeEventListener("resize", handleResize);
        };
    }, []);



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DetailInfoPage/>}/>
        <Route path="/tmp" element={<TmpPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
