export default interface StockPriceGraphData {
    symbol: string;
    period: string;
    dateInfo :{
        maxDate: number;
        minDate: number;
    };
    priceInfo :{
        maxPrice:number;
        minPrice:number;
    };
    data :
        {
            time: number;
            price: number;
        }[],
//     data타입은 어레이 일떄 위와같이 선언

}
