import OrderRequest from "../../entities/order/order-request";
import OrderResult from "../../entities/order/order-result";
import QueryOrder from "../../entities/order/query-order";

export default interface OrderUseCase {
    createOrder(order: OrderRequest): Promise<OrderResult>
    queryOrder(query: QueryOrder): Promise<OrderResult>
}