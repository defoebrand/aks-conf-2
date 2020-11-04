import logo from './logo.png';
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Welcome to AKS!</h1>
        <img src={logo} className="App-logo" alt="logo" />


        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={CreateRoom}/>
            <Route path="/room/:roomID" component={Room}/>
          </Switch>
        </BrowserRouter>


        <a
          className="App-link"
          href="https://www.anglustudija.lt/"
          target="_blank"
          rel="noopener noreferrer"
        >
          VISIT AKS!
        </a>
      </header>
    </div>
  );
}

export default App;
