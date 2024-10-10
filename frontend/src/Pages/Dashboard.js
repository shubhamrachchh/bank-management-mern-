import React from 'react';
import AccountDetails from '../components/Account/AccountDetails';
import TransactionList from '../components/Account/TransactionDetails';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <AccountDetails />
      <TransactionList />
    </div>
  );
};

export default Dashboard;