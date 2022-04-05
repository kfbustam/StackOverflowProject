import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App(){
    return(
        <div className="App">
          <Router>
         <Navbar/>
         <Layout/>
         <Switch>
             <Route exact path="/" component={Dashboard}/>
         </Switch>
         </Router>

        </div>
    );
}

export default App;