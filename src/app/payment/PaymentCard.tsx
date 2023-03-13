import {Box, Card, CardContent, CardHeader, CardMedia, Container, Stack, Typography} from "@mui/material";
import React from "react";
import Order from "../../domain/entities/order/order";


export interface PaymentCardProps {
    price?: number,
    merchantName?: string
    merchantId?: string | null,
    productName?: string,
    order: Order | null,
    isExpired: boolean,
    seconds: number
}

export default function PaymentCard(props: PaymentCardProps) {

    return (
        <Card sx={{ maxWidth: 800 }}>
            if (getOrder) {
            <Box mt={16}>
                <Container maxWidth="xs">
                    <h2>{props.price ?? "-"} USD</h2>
                    <h2>= {props.price ? props.price + 0.1 : "-"} USDT</h2>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <h3>Merchant Name</h3>
                        <h3>{props.merchantName}</h3>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <h3>Merchant ID</h3>
                        <h3>{props.merchantId}</h3>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <h3>Product Name</h3>
                        <h3>{props.productName}</h3>
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
                                image={props.order?.qrcodeLink}
                                alt="Paella dish"
                            />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            {props.order?.prepayId}
                        </Typography>
                        <CardContent>
                            {props.isExpired ? (
                                <Typography variant="body1" color="text.secondary">
                                    Expired
                                </Typography>
                            ) : (
                                <Typography variant="body1" color="text.secondary">
                                    Time remaining {props.seconds}s
                                </Typography>
                            )
                            }
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        }
        </Card>
    )
}