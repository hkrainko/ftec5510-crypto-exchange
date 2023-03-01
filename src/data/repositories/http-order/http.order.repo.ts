import OrderRepo from "../../../domain/interfaces/repositories/order.repo";
import OrderRequest from "../../../domain/entities/order/order-request";
import OrderResult from "../../../domain/entities/order/order-result";
import QueryOrder from "../../../domain/entities/order/query-order";


export class HttpOrderRepo implements OrderRepo {
    createOrder(order: OrderRequest): Promise<OrderResult> {
        throw new Error("Method not implemented.");
    }
    queryOrder(query: QueryOrder): Promise<OrderResult> {
        throw new Error("Method not implemented.");
    }

}