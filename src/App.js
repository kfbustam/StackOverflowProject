import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App(){
    return(
        <div className="App">
          <Router>
         <Navbar/>
         <Switch>
             <Route exact path="/" component={Layout}/>
             <Route exact path="/login" component={Login}/>
             <Route exact path="/signup" component={SignUp}/>
         </Switch>
         </Router>
        </div>
    );
}

export default App;