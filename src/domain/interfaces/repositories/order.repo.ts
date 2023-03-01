import OrderResult from "../../entities/order/order-result";
import OrderRequest from "../../entities/order/order-request";
import QueryOrder from "../../entities/order/query-order";

export default interface OrderRepo {
    createOrder(order: OrderRequest): Promise<OrderResult>
    queryOrder(query: QueryOrder): Promise<OrderResult>
}