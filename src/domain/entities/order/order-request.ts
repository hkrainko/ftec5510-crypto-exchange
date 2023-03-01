export default interface OrderRequest {
    orderAmount: number
    currency: string
    supportPayCurrency: string[]
    expireTime: number
}