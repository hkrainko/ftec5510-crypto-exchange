import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Grid, Icon, Skeleton,
    Stack,
    Typography,
    useTheme
} from "@mui/material";
import React, {useState} from "react";
import Order from "../../domain/entities/order/order";
import LogoImage from '../../logo.svg';
import ExchangeIcon from '@mui/icons-material/CurrencyExchange'
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
    cardStyle: {
        border: '2px dotted lightgray',
        borderRadius: '8px',
    }
}))


export interface PaymentCardProps {
    price?: number,
    merchantName?: string
    merchantId?: string | null,
    productName?: string,
    order: Order | null,
    isExpired: boolean,
    seconds: number,
    exchangeRate: number | null,
}

export default function PaymentCard(props: PaymentCardProps) {

    const classes = useStyles().classes;

    const [isQRLoading, setIsQRLoading] = useState(true);
    const [isQRError, setIsQRError] = useState(false);

    function handleLoad() {
        setIsQRLoading(false);
    }

    function handleError() {
        setIsQRLoading(false);
        setIsQRError(true);
    }

    const getUSDTPrice = () => {
        if (props != null && props.price && props.exchangeRate) {
            const usdtPrice = props.price / props.exchangeRate
            return usdtPrice.toFixed(8).trim() + " USDT"
        } else {
            return "-"
        }
    }
    const usdtPrice = getUSDTPrice()

    return (
        <Card sx={{maxWidth: 800}}>

            <CardMedia
                component="div"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80px",
                    backgroundColor: "#071e26",
                    p: 2, // add padding here
                }}
            >
                <img src={LogoImage} alt="logo" width={"75%"}/>
            </CardMedia>

            <Box mt={2} mb={2}>
                <Container maxWidth="xs">
                    <Typography variant="h5">{props.price ?? "-"} USD</Typography>
                    <Grid container alignItems="center" justifyContent="center">
                        <ExchangeIcon/>
                        <Box mx={1}/>
                        <Typography variant="h5">{usdtPrice}</Typography>
                    </Grid>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography variant="h6">Merchant Name</Typography>
                        <Typography variant="h6">{props.merchantName}</Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography variant="h6">Merchant ID</Typography>
                        <Typography variant="h6">{props.merchantId}</Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography variant="h6">Product Name</Typography>
                        <Typography variant="h6">{props.productName}</Typography>
                    </Stack>
                    <Box mt={2}/>
                    <Card className={classes.cardStyle} elevation={0}>
                        <Box mt={4}>
                            <Typography variant="h5" color="text.secondary">
                                You pay {usdtPrice ?? "-"}
                            </Typography>
                        </Box>
                        <Box mt={0}>
                            <CardHeader
                                subheader="Scan this QRCode in the Binance APP"
                            />
                        </Box>
                        <Box p={8} mt={-10} mb={-11} height={280}>
                            <CardMedia
                                component="img"
                                image={props.order?.qrcodeLink}
                                alt="Loading..."
                                onLoad={handleLoad}
                                onError={handleError}
                                sx={{
                                    height: "100%",
                                }}
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
        </Card>
    )
}