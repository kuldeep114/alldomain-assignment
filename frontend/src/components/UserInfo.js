import React from 'react';
import { Link } from "react-router-dom";
// import logo from '../logo.svg';
import '../App.css';


const UserInfo = () => {
    return (
        <div>
        <header className="App-header">
          <h3>KULDEEP</h3>
          <Link to="/table">Goto Table</Link>
        </header>
        </div>
    )
}

export default UserInfo;