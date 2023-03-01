export default interface OrderResult {
    prepayId: string
    merchantTradeNo: string
    status: string
    currency: string
    orderAmount: number
    createTime: number
}