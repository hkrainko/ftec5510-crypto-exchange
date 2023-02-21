import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./app/header/Header";
import {
    Avatar,
    Button,
    Card, CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    IconButton,
    Typography
} from "@mui/material";
import AuthView from "./app/auth/AuthView";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header/>

          <Container maxWidth="sm">

              <h2>2555 USD</h2>
              <h2>= 2555 USDT</h2>

              <h2>3332</h2>
              <h2>3332</h2>

              <Card>
                  <CardHeader>
                        <h2>3332</h2>
                  </CardHeader>
                  <CardMedia
                      component="img"
                      height="194"
                      image="/static/images/cards/paella.jpg"
                      alt="Paella dish"
                  />
                  <CardContent>
                      <Typography variant="body2" color="text.secondary">
                          This impressive paella is a perfect party dish and a fun meal to cook
                          together with your guests. Add 1 cup of frozen peas along with the mussels,
                          if you like.
                      </Typography>
                  </CardContent>
              </Card>
          </Container>



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
