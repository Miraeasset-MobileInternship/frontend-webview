export default interface WatchedStockInfoTypes {
    totalData: number;
    watchedStockInfoList : {

        symbol:string;
        stockTitle:string;
        price:number;
        changePercent:number;
        changePrice:number;
        rank:number;

    }[],
}