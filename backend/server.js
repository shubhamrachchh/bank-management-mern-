const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const bodyParser = require("body-parser");

const app = express();

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes );
app.use('/api/account', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/account/:accountNumber', accountRoutes);


const PORT = 5000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));