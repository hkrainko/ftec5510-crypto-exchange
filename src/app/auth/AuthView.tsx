import {Box, Button, Grid} from "@mui/material";
import React from "react";


export default function AuthView() {


    return (
        <Box mt={4}>
            sss
            <Grid>
                <Grid item xs={12}>
                    Grid 1
                </Grid>
                <Grid item xs={12}>
                    Grid 2
                </Grid>
                <Grid item xs={12}>
                    Grid 3
                </Grid>
            </Grid>
        </Box>
    )
}

const AuthButton = ({onClick, children}:
                        { onClick: () => void, children: React.ReactNode }) => {
    return (
        <Button variant="contained" color="primary" onClick={() => onClick()}>
            {children}
        </Button>
    )
}