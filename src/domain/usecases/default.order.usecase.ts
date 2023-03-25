import OrderUseCase from "../interfaces/usecases/order.usecase";
import OrderRequest from "../entities/order/order-request";
import OrderResult from "../entities/order/order-result";
import QueryOrder from "../entities/order/query-order";
import OrderRepo from "../interfaces/repositories/order.repo";
import {HttpOrderRepo} from "../../data/repositories/http-order/http.order.repo";
import Order from "../entities/order/order";

export default class DefaultOrderUsecase implements OrderUseCase {

    private repo: OrderRepo;

    constructor() {
        this.repo = new HttpOrderRepo();
    }

    async createOrder(order: OrderRequest): Promise<Order> {
        return this.repo.createOrder(order);
    }

    async queryOrder(query: QueryOrder): Promise<OrderResult> {
        return this.repo.queryOrder(query);
    }

    async getUSDTExchangeRate(): Promise<number> {
        return this.repo.getUSDTExchangeRate();
    }

}