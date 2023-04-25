
import stockDetailInfo from "../types/StockDetailTypes";
import response from "../types/ResponseTypes";
import axios from "axios";

const baseUrl = "http://m-crew.iptime.org:8001/api/v2/auth"


class landingService {

    //카드뷰에 써있는 상단 주식정보
    getToken(userId: number) {
        return axios.get<response>(
            baseUrl + "/" + userId +"/get-token", // api 주소
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            } // header 정의
        )
    }




}
export default new landingService();