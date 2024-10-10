const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

try {
  // Connect to MongoDB
  mongoose.connect('mongodb+srv://23010101427:Shubham0406@shubham.hvb9p.mongodb.net/banking', {
  }).then(() => {
    console.log('Connected to MongoDB');
    const app = express();

    app.use(bodyParser.urlencoded());

    // Routes
    app.use('/users', userRoutes);
    app.use('/accounts', accountRoutes);
    app.use('/transactions', transactionRoutes);

    // Start server
    const Port = 3236;
    app.listen(Port, () => {
      console.log(`Server started on port ${Port}`);
    });
  }).catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });
} catch (err) {
  console.log('An error occurred:', err);
}