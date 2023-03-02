import {Mapper} from "../../../utils/mapper";
import Order from "../../../../domain/entities/order/order";

export default interface HttpCreateOrderResp {
    status: string
    code: string
    message: string
    data: {
        status: string
        code: string
        errorMessage: null | string
        data: {
            prepayId: string
            terminalType: string
            expireTime: number
            qrcodeLink: string
            qrContent: string
            checkoutUrl: string
            deeplink: string
            universalUrl: string
        };
    };
}

export class HttpCreateOrderMapper extends Mapper<HttpCreateOrderResp, Order> {
    mapFrom(param: HttpCreateOrderResp): Order {
        return {
            expireTime: param.data.data.expireTime,
            prepayId: param.data.data.prepayId,
            qrcodeContent: param.data.data.qrContent,
            qrcodeLink: param.data.data.qrcodeLink
        };
    }

    mapTo(param: Order): HttpCreateOrderResp {
        return {
            code: "",
            data: {
                code: "",
                data: {
                    checkoutUrl: "",
                    deeplink: "",
                    expireTime: 0,
                    prepayId: "",
                    qrContent: "",
                    qrcodeLink: "",
                    terminalType: "",
                    universalUrl: ""
                },
                errorMessage: "undefined",
                status: ""
            },
            message: "",
            status: ""
        };
    }
}