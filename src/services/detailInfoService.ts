
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
                },
            } // header 정의
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
                },
            } // header 정의
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
                },
            } // header 정의
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
                },
            } // header 정의
        )
    }


    //최다 조회
    getWatchList(count:number) {
        return axios.get<response>(
            baseUrl + "/watch-list?count=" +count, // api 주소
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            } // header 정의
        )
    }

}
export default new detailInfoService();