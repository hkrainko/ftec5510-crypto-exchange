import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./app/header/Header";
import {
    Avatar, Box,
    Button,
    Card, CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    IconButton, Stack,
    Typography
} from "@mui/material";
import AuthView from "./app/auth/AuthView";
import OrderRepo from "./domain/interfaces/repositories/order.repo";
import OrderUseCase from "./domain/interfaces/usecases/order.usecase";
import DefaultOrderUsecase from "./domain/usecases/default.order.usecase";
import Order from "./domain/entities/order/order";
import OrderResult from "./domain/entities/order/order-result";

const orderUseCase: OrderUseCase = new DefaultOrderUsecase()

function App() {

    const queryParams = new URLSearchParams(window.location.search)
    const redirectUrl = queryParams.get('redirectUrl')

    const [getOrder, setOrder] = React.useState<Order | null>(null)
    const [getOrderResult, setOrderResult] = React.useState<OrderResult | null>(null)

    useEffect(() => {
        orderUseCase.createOrder({
            currency: "USDT",
            expireTime: 60000,
            orderAmount: 0.0000001,
            supportPayCurrency: [
                "USDT",
            ]
        }).then((order) => {
            console.log(`createOrder success:${JSON.stringify(order)}`)
            setOrder(order)
            return orderUseCase.queryOrder({
                prepayId: order.prepayId
            })
        }).then((orderResult) => {
            console.log(`queryOrder success:${JSON.stringify(orderResult)}`)
            setOrderResult(orderResult)
            // Terminate the payment process with success code
        }).catch((e) => {
            // Terminate the payment process with fail code
            console.log(e)
        });
    }, [])

    const onClickCancel = () => {
        console.log(`cancel action`)
        if (redirectUrl) {
            window.location.href = redirectUrl
        }
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Header/>


                if (getOrder) {
                <Box mt={16}>
                    <Container maxWidth="xs">
                        <h2>2555 USD</h2>
                        <h2>= 2555 USDT</h2>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <h3>Merchant Name</h3>
                            <h3>XXX insurance</h3>
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <h3>Product Name</h3>
                            <h3>Premium Plan A</h3>
                        </Stack>
                        <Card>
                            <Box mt={2}>
                                <CardHeader
                                    subheader="Scan this QRCode in the Binance APP"
                                />
                            </Box>
                            <Box p={8} mt={-8} mb={-11}>
                                <CardMedia
                                    component="img"
                                    image={getOrder?.qrcodeLink}
                                    alt="Paella dish"
                                />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {getOrder?.prepayId}
                            </Typography>
                            <CardContent>
                                <Typography variant="body1" color="text.secondary">
                                    Time remaining 09:12
                                </Typography>
                            </CardContent>
                        </Card>
                    </Container>
                </Box>
            }


                <Box mt={2}>
                    <Button
                        onClick={onClickCancel}
                    >
                        <Typography variant="body1" color="text.secondary">Cancel</Typography>
                    </Button>
                </Box>

            </BrowserRouter>
        </div>
    );
}

export default App;
