import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        setError('Error fetching transactions');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transaction History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              ${transaction.amount} on {new Date(transaction.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TransactionList;