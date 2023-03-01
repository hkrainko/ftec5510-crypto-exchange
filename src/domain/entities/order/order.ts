export default interface Order {
    prepayId: string
    expireTime: number
    qrcodeLink: string
    qrcodeContent: string
}