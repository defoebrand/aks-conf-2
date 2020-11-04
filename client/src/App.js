import logo from './logo.jpg';
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


        //[DON'T TOUCH THIS]
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={CreateRoom}/>
            <Route path="/room/:roomID" component={Room}/>
          </Switch>
        </BrowserRouter>
        //DON'T TOUCH THIS


        // <a
        //   className="App-link"
        //   href="https://reactjs.org"
        //   target="_blank"
        //   rel="noopener noreferrer"
        // >
        //   Learn React
        // </a>
        <a href="https://www.anglustudija.lt/" className="App-link" target="_blank" rel="noopener noreferrer">VISIT AKS!</a>
      </header>
    </div>
  );
}

export default App;
