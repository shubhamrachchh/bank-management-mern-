import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Transaction from './components/Auth/Transaction';
import Account from './components/Auth/Account'
import AccountDetails from './components/Account/AccountDetails';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/transaction' element={<Transaction/>}/>
          <Route path='/account' element={<Account />}/>
          <Route path='/accountdetails' element={<AccountDetails />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;