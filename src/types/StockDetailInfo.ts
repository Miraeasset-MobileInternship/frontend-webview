export default interface StockDetailInfo {
    stockTitle: string, //종목명
    marketPrice: string, //가격
    currency: string, //화폐단위
    stockType:string, //타입
    marketTitle:string, //상장된 시장
    isOpen: boolean, //장의 상태
    change: number, //변동가격
    changePercent: number, //변동 퍼센트

}