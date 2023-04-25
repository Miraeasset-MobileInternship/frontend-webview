
import stockDetailInfo from "../types/StockDetailTypes";
import response from "../types/ResponseTypes";
import axios from "axios";

const baseUrl = "http://m-crew.iptime.org:8001/api/v2/stock-detail"


class detailInfoService {

    //카드뷰에 써있는 상단 주식정보
    getStockDetail(stockId: string) {
        return axios.get<response>(
            baseUrl + "/" + stockId, // api 주소
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            }, // header 정의
        )
    }

    //주식 차트
    getChartData(range:string, stockId: string) {
        return axios.get<response>(
            baseUrl + "/" + stockId + "/chart?range=" + range, // api 주소
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            }, // header 정의
        )
    }


    //회사정보
    getCompanyInfo(stockId: string) {
        return axios.get<response>(
            baseUrl + "/" + stockId + "/company-info", // api 주소
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            }, // header 정의
        )
    }


    //종목뉴스
    getStockNews(stockId: string, num:string) {
        return axios.get<response>(
            baseUrl + "/" + stockId + "/news?num="+num, // api 주소
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            }, // header 정의
        )
    }


    //최다 조회
    getWatchList(count:number, type:string) {
        return axios.get<response>(
            baseUrl + "/watch-list?count=" +count+"&strIds="+type, // api 주소
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            }, // header 정의
        )
    }

    //주식 종목 상세(52 주..등)
    getStockDetailData(stockId:string) {
        return axios.get<response>(
            baseUrl + "/" + stockId + "/stock-info", // api 주소
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            }, // header 정의
        )
    }


    //투자 트랜드 관련
    getRecommendedTrend(stockId:string, period:string) {
        return axios.get<response>(
            baseUrl + "/" + stockId + "/recommend-trend?period="+period, // api 주소
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            }, // header 정의
        )
    }


    //유사종목
    getSimilarStock(stockId:string) {
        return axios.get<response>(
            baseUrl + "/" + stockId + "/similar", // api 주소
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            }, // header 정의
        )
    }
}
export default new detailInfoService();