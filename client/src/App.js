import logo from './logo.png';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import './App.css';

function App() {
  return ( <
    div className = "App" >
    <
    header className = "App-header" >


    <
    BrowserRouter >
    <
    Switch >
    <
    Route path = "/"
    exact component = {
      CreateRoom
    }
    /> <
    Route path = "/room/:roomID"
    component = {
      Room
    }
    /> < /
    Switch > <
    /BrowserRouter>



    <
    /header> < /
    div >
  );
}

export default App;