const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://23010101427:Shubham0406@shubham.hvb9p.mongodb.net/banking', 
        { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;