export default interface SimilarStockTypes {
    totalData:number;
    stockTitle:string;
    stockInfoList:{
        symbol:string;
        stockTitle:string;
        price:number;
        changePrice:number;
        changePercent:number;
    }[],

}
