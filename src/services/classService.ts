
import stockDetailInfo from "../types/StockDetailTypes";
import response from "../types/ResponseTypes";
import axios from "axios";

const baseUrl = "http://m-crew.iptime.org:8001/api/v2/class"


class classService {


    getCurrency(classId:number) {
        return axios.get<response>(
            baseUrl + "/"+classId+"/currency", // api 주소
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            } // header 정의
        )
    }






}
export default new classService();