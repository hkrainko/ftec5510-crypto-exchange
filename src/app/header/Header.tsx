import {AppBar, IconButton} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import React, {useState} from "react";
import Logo from '../../logo.svg';

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
                    <img width={240} src={Logo}/>
                    {/*<Typography align="left" variant="h6" component="div" ml={1}>*/}
                    {/*    Exchange Payment*/}
                    {/*</Typography>*/}
                </IconButton>


            </AppBar>
        </div>
    )
}