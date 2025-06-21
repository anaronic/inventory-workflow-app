const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  transactionType: {
    type: String,
    enum: ['expense', 'income'], // 'bought' means you paid, 'sold' means you earned
    required: true,
  }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
