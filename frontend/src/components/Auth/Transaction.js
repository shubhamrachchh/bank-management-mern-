import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Transaction.css'

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('credit'); // Default type
  const [accountId, setAccountId] = useState(''); // Account ID for transaction
  const [addError, setAddError] = useState(null);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        setError('Failed to load transactions. Please try again.');
      }
    };
    
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    
    if (!amount || !accountId) {
      setAddError('Please enter amount and select an account.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      setAddError('Amount must be a valid number');
      return;
    }

    try {
      const newTransaction = { accountId: accountId, amount: amount, type: type };
      console.log("1");
      const response = await axios.post('http://localhost:5000/api/transactions', newTransaction);
      console.log("2");
      setTransactions((prevTransactions) => [...prevTransactions, response.data]);
      resetForm();
      setAddError(null);
    } catch (error) {
      console.log(error);
      setAddError('Failed to add transaction. Please try again.');
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      console.log('1');
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      console.log('2');
      setTransactions(transactions.filter(transaction => transaction._id !== id));
      console.log('3');
    } catch (error) {
      console.log(error);
      setError('Failed to delete transaction. Please try again.',3000);
    }
  };
  

  const handleEditTransaction = (transaction) => {
    setEditingTransactionId(transaction._id);
    setAmount(transaction.amount);
    setType(transaction.type);
    setAccountId(transaction.accountId);
  };

  const handleUpdateTransaction = async (e) => {
    e.preventDefault();
    
    if (!amount || !accountId) {
      setAddError('Please enter amount and select an account.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      setAddError('Amount must be a valid number');
      return;
    }

    try {
      const updatedTransaction = { accountId, amount: amount, type };
      const response = await axios.patch(`http://localhost:5000/api/transactions/${editingTransactionId}`, updatedTransaction);
      setTransactions(transactions.map(transaction => 
        transaction._id === editingTransactionId ? response.data : transaction
      ));
      resetForm();
      setEditingTransactionId(null);
      setAddError(null);
      setSuccessMessage('Updated Successfully..');
    } catch (error) {
      setAddError('Failed to update transaction. Please try again.');
    }
  };

  const resetForm = () => {
    setAmount(0);
    setAccountId('');
    setType('credit');
  };

  return (
      <div className="container">
        <h2>Transactions</h2>
        {error && <div className="error">{error}</div>}
        {addError && <div className="error">{addError}</div>}
    
        <form onSubmit={editingTransactionId ? handleUpdateTransaction : handleAddTransaction}>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <select value={type} onChange={(e) => setType(e.target.value)} id='creditdebit'>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
          <input
            type="text"
            placeholder="Account ID"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            required
          />
          <button type="submit" id='addtransaction'>{editingTransactionId ? 'Update Transaction' : 'Add Transaction'}</button>
        </form>
    
        <ul>
  {transactions.length === 0 ? (
    <li>No transactions available.</li>
  ) : (
    transactions.map((transaction) => (
      <li key={transaction._id}>
        Amount: ${transaction.amount.toFixed(2)} - Type: {transaction.type} - Account No : {transaction.accountId ? transaction.accountId.accountNumber : 'N/A'}
        <div id="editdelete">
          <button onClick={() => handleEditTransaction(transaction)} id='edit'>Edit</button>
          <button onClick={() => handleDeleteTransaction(transaction._id)} id='delete'>Delete</button>
        </div>
      </li>
    ))
  )}
</ul>

      </div>
    );
  };

export default Transaction;
