import {Mapper} from "../../../utils/mapper";
import Order from "../../../../domain/entities/order/order";
import HttpCreateOrderResp from "./http.create-order.resp";
import OrderResult from "../../../../domain/entities/order/order-result";


export default interface HttpQueryOrderResp {
    status: string
    code: string
    message: string
    data: {
        status: string
        code: string
        errorMessage: null | string
        data: PaymentData
    }
}

interface PaymentData {
    merchantId: string
    prepayId: string
    transactionId: null
    merchantTradeNo: string
    tradeType: null
    status: string
    currency: string
    orderAmount: number
    openUserId: null
    passThroughInfo: null
    transactTime: number
    createTime: number
}

export class HttpQueryOrderMapper extends Mapper<HttpQueryOrderResp, OrderResult> {
    toString(): string {
        return super.toString();
    }

    toLocaleString(): string {
        return super.toLocaleString();
    }

    valueOf(): Object {
        return super.valueOf();
    }

    hasOwnProperty(v: PropertyKey): boolean {
        return super.hasOwnProperty(v);
    }

    isPrototypeOf(v: Object): boolean {
        return super.isPrototypeOf(v);
    }

    propertyIsEnumerable(v: PropertyKey): boolean {
        return super.propertyIsEnumerable(v);
    }

    mapFrom(param: HttpQueryOrderResp): OrderResult {

        const data = param.data.data;

        return {
            createTime: data.createTime,
            currency: data.currency,
            merchantTradeNo: data.merchantTradeNo,
            orderAmount: data.orderAmount,
            prepayId: data.prepayId,
            status: data.status,
        };
    }

    mapTo(param: OrderResult): HttpQueryOrderResp {
        return {
            code: "",
            data: {
                code: "",
                data: {
                    merchantId: "",
                    prepayId: "",
                    transactionId: null,
                    merchantTradeNo: "",
                    tradeType: null,
                    status: "",
                    currency: "",
                    orderAmount: 0,
                    openUserId: null,
                    passThroughInfo: null,
                    transactTime: 0,
                    createTime: 0,
                },
                errorMessage: null,
                status: ""
            },
            message: "",
            status: ""
        };
    }


}