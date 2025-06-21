const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// POST /api/inventory
router.post('/', async (req, res) => {
  try {
    const { itemName, amount, transactionType, date } = req.body;

    const newItem = new Inventory({
      itemName,
      amount,
      transactionType,
      date,
    });

    await newItem.save();
    res.status(201).json({ message: 'Item added successfully!', item: newItem });
  } catch (error) {
    console.error('❌ Error saving item:', error);
    res.status(500).json({ message: 'Server error' });
  }
  console.log('Incoming Inventory Data:', req.body);
  console.log('Item saved:', newItem);
  
});

// GET /api/inventory
router.get('/', async (req, res) => {
    try {
      const allItems = await Inventory.find().sort({ date: -1 }); // latest first
      res.status(200).json(allItems);
    } catch (error) {
      console.error('❌ Error fetching inventory:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// DELETE /api/inventory - Clear all inventory data
router.delete('/', async (req, res) => {
  try {
    await Inventory.deleteMany({});
    res.status(200).json({ message: 'All inventory data cleared successfully!' });
  } catch (error) {
    console.error('❌ Error clearing inventory:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
  
module.exports = router;