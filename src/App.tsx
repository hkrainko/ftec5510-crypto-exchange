import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Box, Button, createTheme, ThemeProvider, Typography} from "@mui/material";
import OrderUseCase from "./domain/interfaces/usecases/order.usecase";
import DefaultOrderUsecase from "./domain/usecases/default.order.usecase";
import Order from "./domain/entities/order/order";
import OrderResult from "./domain/entities/order/order-result";
import querystring from "query-string";
import PaymentCard from "./app/payment/PaymentCard";

const orderUseCase: OrderUseCase = new DefaultOrderUsecase()

const theme = createTheme({
    typography: {
        h5: {
            color: "#071e26",
            fontWeight: 800,
        },
        h6: {
            color: "#071e26",
            fontWeight: 600,
        }
        // you can define other typography variants here
    },
});

function App() {

    const queryParams = new URLSearchParams(window.location.search)
    const merchantId = queryParams.get('merchantId')
    const itemCode = queryParams.get('itemCode')
    const redirectUrl = queryParams.get('redirectUrl')
    const personalInfo = queryParams.get('pi')

    // Hardcoded value
    const merchantName = "AAA Insurance"
    const price = getProductPrice(itemCode)
    const productName = getProductName(itemCode)

    const [getOrder, setOrder] = React.useState<Order | null>(null)
    const [getOrderResult, setOrderResult] = React.useState<OrderResult | null>(null)
    const [exchangeRate, setExchangeRate] = React.useState<number | null>(null)
    const [getExpireTime, setExpireTime] = React.useState<number>(0)
    const [seconds, setSeconds] = React.useState<number>(0);
    const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null);

    const isExpired = seconds <= 0

    useEffect(() => {
        console.log("useEffect createOrder")
        if (!price || !exchangeRate) {
            return
        }
        const orderAmount = price / exchangeRate;
        orderUseCase.createOrder({
            currency: "USDT",
            expireTime: 60000,
            orderAmount: orderAmount,
            supportPayCurrency: [
                "USDT",
            ]
        }).then((order) => {
            console.log(`createOrder success:${JSON.stringify(order)}`)
            setOrder(order)
            setExpireTime(order.expireTime)
        }).catch((e) => {
            // Terminate the payment process with fail code
            console.log(e)
        });
    }, [exchangeRate, price])

    useEffect(() => {
        console.log("get exchange rate")
        orderUseCase.getUSDTExchangeRate().then(
            (exchangeRate) => {
                console.log(`exchangeRate:${exchangeRate}`)
                setExchangeRate(exchangeRate)
            }
        )
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            console.log(`fetchData ${getOrder}`)
            if (getOrder) {
                console.log("fetchData order")
                const orderResult = await orderUseCase.queryOrder({
                    prepayId: getOrder.prepayId
                })
                console.log(`queryOrder success:${JSON.stringify(orderResult)}`)
                setOrderResult(orderResult)
                if (orderResult?.status === "PAID") { // "EXPIRED"
                    console.log("fetchData SUCCESS")
                    // return success

                    if (redirectUrl && merchantId && personalInfo) {
                        redirect(redirectUrl, 0, merchantId, getOrder.prepayId, personalInfo)
                    }
                } else if (orderResult?.status === "EXPIRED") {
                    console.log("fetchData EXPIRED")
                    // return expired
                    return () => {
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                        }
                    }
                }
            }
            const id = setTimeout(fetchData, 3000); // long polling interval of 3 seconds
            setTimeoutId(id)
        };

        fetchData();
    }, [getOrder]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const distance = getExpireTime - now;

            if (distance < 0) {
                clearInterval(intervalId);
                setSeconds(0);
            } else {
                const seconds = Math.floor(distance / 1000);
                setSeconds(seconds);
            }
        }, 1000);
    }, [getExpireTime])

    const redirect = (redirectUrl: string, result: number, merchantId?: string, prepayId?: string, personalInfo?: string) => {

        const queryParams = {
            result: result, //0: success, 1: user cancelled, 2: expired: 3, 99: error
            merchantId: merchantId,
            prepayId: prepayId,
            pi: personalInfo
        }

        window.location.href = `${redirectUrl}?${querystring.stringify(queryParams)}`
    }

    const onClickCancel = () => {
        console.log(`cancel action`)
        if (redirectUrl) {
            redirect(redirectUrl, 1)
        }
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    {/*<Header/>*/}

                    <Box mt={10} display={"flex"} justifyContent={"center"}>
                        <PaymentCard
                            price={price}
                            merchantName={merchantName}
                            merchantId={merchantId}
                            productName={productName}
                            order={getOrder}
                            isExpired={isExpired}
                            seconds={seconds}
                            exchangeRate={exchangeRate}
                        />
                    </Box>


                    <Box mt={2}>
                        <Button
                            onClick={onClickCancel}
                        >
                            <Typography variant="body1" color="text.secondary">Cancel</Typography>
                        </Button>
                    </Box>

                </BrowserRouter>
            </ThemeProvider>
        </div>
    );

    function getProductPrice(itemCode: string | null) {
        switch (itemCode) {
            case "7e1fbb64-4299-4b19-a265-863b1e7b06c9":
                return 0.9
            case "dfda2a6e-a8d4-430a-8372-6bde58d775ce":
                return 4.9
            case "b1117f32-2c01-45e6-9ce1-aa8c8e4d1ee2":
                return 19.9
        }
    }

    function getProductName(itemCode: string | null) {
        switch (itemCode) {
            case "7e1fbb64-4299-4b19-a265-863b1e7b06c9":
                return "Basic Plan"
            case "dfda2a6e-a8d4-430a-8372-6bde58d775ce":
                return "Prime Plan"
            case "b1117f32-2c01-45e6-9ce1-aa8c8e4d1ee2":
                return "Executive Plan"
        }
    }
}

export default App;
