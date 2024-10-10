const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  amount: Number,
  type: { type: String, enum: ['credit', 'debit'] },
  date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Transaction', transactionSchema);