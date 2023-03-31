import CompanyInfoTypes from "./CompanyInfoTypes";
import SimilarStockTypes from "./SimilarStockTypes";
import StockDetailInfoTypes from "./StockDetailInfoTypes";
import StockDetailTypes from "./StockDetailTypes";
import StockNewsTypes from "./StockNewsTypes";
import StockTrendTypes from "./StockTrendTypes";
import WatchedStockInfoTypes from "./WatchedStockInfoTypes";

export default interface ResponseTypes {

    status: {
        status:string;
        message:string;
    };

    result: CompanyInfoTypes|SimilarStockTypes|StockDetailInfoTypes|StockDetailTypes|StockNewsTypes|StockTrendTypes|WatchedStockInfoTypes|null;

}
