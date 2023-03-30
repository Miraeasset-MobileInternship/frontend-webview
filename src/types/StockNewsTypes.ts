export default interface StockNewsTypes {
    totalData: number;
    stockNewsList: {
        link:string;
        title:string;
        date:string;
    }[],
}