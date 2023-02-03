import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./app/header/Header";
import {Button} from "@mui/material";
import AuthView from "./app/auth/AuthView";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header/>

          <Routes>
              <Route path="/auth" element={<AuthView/>}/>

              {/*<Route path="*" element={<AuthView/>}/>*/}
          </Routes>
          <Button variant="contained">Contained</Button>

      </BrowserRouter>

      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.tsx</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
