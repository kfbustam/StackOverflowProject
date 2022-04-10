import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;