import {Button, createStyles, IconButton, Theme, Typography, useTheme} from "@mui/material";
import {makeStyles, withStyles} from "tss-react/mui";
import {AppBar} from "@mui/material";
import {createMakeAndWithStyles} from "tss-react";
import {useState} from "react";
import { ReactComponent as Logo } from '../../logo.svg';
import PaymentIcon from '@mui/icons-material/Payment';

// const { makeStyles, withStyles } = createMakeAndWithStyles({
//     useTheme,
//     /*
//       OR, if you have extended the default mui theme adding your own custom properties:
//       Let's assume the myTheme object that you provide to the <ThemeProvider /> is of
//       type MyTheme then you'll write:
//       */
//     //"useTheme": useTheme as (()=> MyTheme)
// });

const useStyles = makeStyles<{ color: 'red' | 'blue' }>()((theme, { color }) => ({
    root: {
        color,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
}))

export default function Header() {

    const [color, setColor] = useState<'red' | 'blue'>('red');
    const classes = useStyles({color})

    return (
        <div>
            <AppBar>
                <IconButton edge="start" color="inherit" aria-label="logo">
                    <PaymentIcon/>
                    <Typography align="left" variant="h6" component="div" ml={1}>
                        Exchange Payment
                    </Typography>
                </IconButton>
            </AppBar>
        </div>
    )
}