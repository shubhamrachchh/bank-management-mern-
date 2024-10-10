import React, { useState } from 'react';
import axios from 'axios';

const CreateAccount = ({ userId }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [accounts, setAccounts] = useState([]);

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (!balance || !accountNumber) {
      setError('Please enter balance and account number.');
      return;
    }

    if (isNaN(balance) || balance < 0) {
      setError('Balance must be a valid non-negative number');
      return;
    }

    try {
      const newAccount = { userId, balance, accountNumber };
      const response = await axios.post('http://localhost:5000/api/account/register', newAccount);
      setSuccessMessage('Account created successfully!');
      setBalance(0);
      setAccountNumber('');
      setError(null);
      setAccounts([...accounts, response.data]);
    } catch (error) {
      console.error('Error creating account:', error);
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create New Account</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <form onSubmit={handleCreateAccount}>
        <input
          type="number"
          placeholder="Initial Balance"
          value={balance}
          onChange={(e) => setBalance(Number(e.target.value))}
          required
        />
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
