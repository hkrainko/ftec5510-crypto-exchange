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

const orderUseCase: OrderUseCase = new DefaultOrderUsecase()

function App() {

    const queryParams = new URLSearchParams(window.location.search)
    const redirectUrl = queryParams.get('redirectUrl')

    useEffect(() => {
        orderUseCase.createOrder({
            currency: "USDT",
            expireTime: 60000,
            orderAmount: 100,
            supportPayCurrency: [
                "USDT",
            ]
        }).then((order) => {
            console.log(`createOrder success:${order}`)
            return orderUseCase.queryOrder({
                prepayId: order.prepayId
            })
        }).then((orderResult) => {
            console.log(`queryOrder success:${orderResult}`)
        }).catch((e) => {
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
                            <Box p={8} mt={-8} mb={-8}>
                                <CardMedia
                                    component="img"
                                    image="qrcode.png"
                                    alt="Paella dish"
                                />
                            </Box>
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    Time remaining 09:12
                                </Typography>
                            </CardContent>
                        </Card>
                    </Container>
                </Box>


                <Box mt={2}>
                    <Button
                        onClick={onClickCancel}
                    >
                        <Typography variant="body1" color="text.secondary">Cancel</Typography>
                    </Button>
                </Box>


                {/*<Routes>*/}
                {/*    <Route path="/auth" element={<AuthView/>}/>*/}

                {/*    /!*<Route path="*" element={<AuthView/>}/>*!/*/}
                {/*</Routes>*/}


                {/*<Button variant="contained">Contained</Button>*/}

            </BrowserRouter>
        </div>
    );
}

export default App;
