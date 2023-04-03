
import stockDetailInfo from "../types/StockDetailTypes";
import response from "../types/ResponseTypes";
import axios from "axios";

const baseUrl = "http://m-crew.iptime.org:8001/api/v2/stock"


class sellingStockService {

    //카드뷰에 써있는 상단 주식정보
    checkSelling(stockId: string, studentId:number) {
        return axios.get<response>(
            baseUrl + "/check-selling?stockId=" + stockId +"&studentId="+studentId, // api 주소
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            } // header 정의
        )
    }



    // buyingStock(studentId:number, stockId:string, amount:number, price:number) {
    //     return axios.post<response>(
    //         baseUrl + "/buy", // api 주소
    //         {
    //             studentId: studentId,
    //             stockId:stockId,
    //             amount:amount,
    //             price:price,
    //         },
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Accept": "application/json",
    //             },
    //         }, // header 정의
    //     )
    // }



}
export default new sellingStockService();