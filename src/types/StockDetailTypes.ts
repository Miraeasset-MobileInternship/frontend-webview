export default interface StockDetailInfo {
    symbol: string;
    stockTitle: string;
    price: number;
    changePrice: number;
    changePercent: number;
    tagInfo : {
        type: string;
        market: string;
        customPriceConfidence: string;
        open: boolean;
    };
}
