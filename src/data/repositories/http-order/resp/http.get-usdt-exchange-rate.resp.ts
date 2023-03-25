import {Mapper} from "../../../utils/mapper";


export default interface HttpGetUSDTExchangeRateResp {
    status: string;
    code: string;
    message: string;
    data: {
        sellCurr: string;
        buyCurr: string;
        price: number;
        quoteId: string;
    };
}

export class HttpGetUSDTExchangeRateMapper extends Mapper<HttpGetUSDTExchangeRateResp, number> {

    mapFrom(param: HttpGetUSDTExchangeRateResp): number {
        return param.data.price;
    }

    mapTo(param: number): HttpGetUSDTExchangeRateResp {
        throw new Error("Method not implemented.");
    }
}