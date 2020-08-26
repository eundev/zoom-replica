import React from 'react';
import './App.css';
import ChatRoom from "./Components/ChatRoom/index";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import RoomCreationPage from './Pages/RoomCreation/index';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/rooms" component={RoomCreationPage}/>
        <Route exact path="/rooms/:id" component={ChatRoom}/>
        <Redirect to="/rooms"/>
      </Switch>
    </Router>
  );
}

export default App;

