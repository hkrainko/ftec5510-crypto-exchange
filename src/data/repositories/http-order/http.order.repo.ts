import OrderRepo from "../../../domain/interfaces/repositories/order.repo";
import OrderRequest from "../../../domain/entities/order/order-request";
import OrderResult from "../../../domain/entities/order/order-result";
import QueryOrder from "../../../domain/entities/order/query-order";
import axios from "axios";
import HttpQueryOrderResp, {HttpQueryOrderMapper} from "./resp/http.query-order.resp";
import HttpCreateOrderResp, {HttpCreateOrderMapper} from "./resp/http.create-order.resp";
import Order from "../../../domain/entities/order/order";


export class HttpOrderRepo implements OrderRepo {

    // private apiPath = "https://cors-anywhere.herokuapp.com/http://www.muecode.com:8080";
    private apiPath = process.env.REACT_APP_CRYPTO_BACKEND_URL || "https://d2d18xc38k0f7a.cloudfront.net"
    private apiToken = null;

    private createOrderMapper = new HttpCreateOrderMapper()
    private queryOrderMapper = new HttpQueryOrderMapper()

    createOrder(order: OrderRequest): Promise<Order> {
        return axios
            .post<HttpCreateOrderResp>(`${this.apiPath}/binance/merchant/api/v1/order`, order)
            .then((resp: { data: HttpCreateOrderResp; }) => {
                return this.createOrderMapper.mapFrom(resp.data)
            })
    }

    queryOrder(query: QueryOrder): Promise<OrderResult> {
        return axios
            .get<HttpQueryOrderResp>(`${this.apiPath}/binance/merchant/api/v1/order/prepay-id/${query.prepayId}`)
            .then((resp: { data: HttpQueryOrderResp; }) => {
                return this.queryOrderMapper.mapFrom(resp.data)
            })
    }

}