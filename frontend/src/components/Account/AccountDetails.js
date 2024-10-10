import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccountDetails.css';

const AccountDetails = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [editedAccount, setEditedAccount] = useState(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/account');
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching account details:', error);
        setError('Failed to fetch account details');
      }
    };

    fetchAccountDetails();
  }, []);
  const handleDelete = async (accountId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this account?');

    if (!confirmDelete) {
      return; 
    }

    try {
      await axios.delete(`http://localhost:5000/api/account/${accountId}`);
      setAccounts(accounts.filter(account => account._id !== accountId)); 
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('Failed to delete account');
    }
  };


  const handleEdit = (account) => {
    setEditedAccount(account);
  };

  const handleSave = async (updatedAccount) => {
    try {
      await axios.patch(`http://localhost:5000/api/account/${updatedAccount._id}`, updatedAccount);
      setAccounts(accounts.map(account => account._id === updatedAccount._id ? updatedAccount : account));
      setEditedAccount(null);
    } catch (error) {
      console.error('Error updating account:', error);
      setError('Failed to update account');
    }
  };

  return (
    <div>
      <h2>Account Details</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : accounts.length > 0 ? (
        <ul>
          {accounts.map((account) => (
            <li key={account._id}>
              {editedAccount?._id === account._id ? (
                <div>
                  <input
                    type="text"
                    value={editedAccount.balance}
                    onChange={(e) => setEditedAccount({ ...editedAccount, balance: e.target.value })}
                  />
                  <button onClick={() => handleSave(editedAccount)}>Save</button>
                </div>
              ) : (
                <div>
                  Account Number: {account.accountNumber}, Balance: ${account.balance}
                  <button onClick={() => handleEdit(account)}>Edit</button>
                  <button onClick={() => handleDelete(account._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No accounts found.</p>
      )}
    </div>
  );
};

export default AccountDetails;
