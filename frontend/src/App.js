import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserInfo from './components/UserInfo';
import Table from './components/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={(props)=><UserInfo  {...props}/>}/>
            <Route path="/table" component={(props)=><Table {...props}/>}/>
          </Switch>
        </Router>
    );
  }
}

export default App;