import * as React from 'react';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Loader from "../components/Loader";
import sellingStockService from "../services/sellingStockService";
import landingService from "../services/landingService";
import TokenTypes from "../types/TokenTypes";





export default function LandingPage() {
    const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search)

    const classId = params.get("classId");
    const userId = params.get("userId");
    const studentId = params.get("studentId");
    const stockId = params.get("stockId");


    const [userInfo, setUserInfo] = useState<TokenTypes>();
    const [loading, setLoading] = useState(true);

    const webViewLogin =
        () => {
            // 이 페이지에서는 all로 간다
            landingService.getToken(Number(localStorage.getItem("userId")))
                .then( res => {

                    if(res.data.status.status === "E000"){

                        // @ts-ignore
                        localStorage.setItem("accessToken",res.data.result.accessToken)

                        //login + accessToken얻기 까지 정상적으로 완료되면 stockId쪽으로 이동하기
                        navigate("/"+stockId);
                    }
                    else{
                        navigate("/error");
                    }

                    setLoading(false);


                })
                .catch(reason => {
                    console.log(reason);
                    navigate("/error"); //여기서 에러나면 그냥 에러페이지로
                });
        };


    //리로드 시마다 1회만 실행
    useEffect(() => {

        if (typeof userId === "string") {
            localStorage.setItem("userId", userId)
        }
        if (typeof classId === "string") {
            localStorage.setItem("classId", classId)
        }
        if (typeof studentId === "string") {
            localStorage.setItem("studentId", studentId)
        }

        webViewLogin();


    },[]);


    return (
        <div style={{height: '100vh'}}>
            <Loader/>
        </div>
    );
}
