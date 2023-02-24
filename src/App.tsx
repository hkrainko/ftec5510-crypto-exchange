import React from 'react';
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

function App() {
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
              <Button>
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
