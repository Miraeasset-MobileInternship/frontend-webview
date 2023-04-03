
import stockDetailInfo from "../types/StockDetailTypes";
import response from "../types/ResponseTypes";
import axios from "axios";

const baseUrl = "http://m-crew.iptime.org:8001/api/v2/stock"


class buyingStockService {

    //카드뷰에 써있는 상단 주식정보
    checkBuying(stockId: string, studentId:number) {
        return axios.get<response>(
            baseUrl + "/check-buying?stockId=" + stockId +"&studentId="+studentId, // api 주소
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            } // header 정의
        )
    }


}
export default new buyingStockService();