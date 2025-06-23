const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Add a new inventory item
 *     tags: [Inventory]
 *     description: Create a new inventory entry to track materials, products, or transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemName
 *               - amount
 *               - transactionType
 *             properties:
 *               itemName:
 *                 type: string
 *                 description: Name or description of the item
 *                 example: "Cotton Fabric"
 *               amount:
 *                 type: number
 *                 description: Amount in rupees (₹)
 *                 minimum: 0
 *                 example: 1500.00
 *               transactionType:
 *                 type: string
 *                 enum: [income, expense]
 *                 description: Type of transaction - income for sales, expense for purchases
 *                 example: "expense"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Transaction date (optional, defaults to current date)
 *                 example: "2024-01-15"
 *     responses:
 *       201:
 *         description: Inventory item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item added successfully!"
 *                 item:
 *                   $ref: '#/components/schemas/Inventory'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     description: Retrieve all inventory entries sorted by date (newest first)
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Maximum number of items to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of items to skip for pagination
 *     responses:
 *       200:
 *         description: List of inventory items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventory'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', async (req, res) => {
    try {
      const allItems = await Inventory.find().sort({ date: -1 }); // latest first
      res.status(200).json(allItems);
    } catch (error) {
      console.error('❌ Error fetching inventory:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

/**
 * @swagger
 * /api/inventory:
 *   delete:
 *     summary: Clear all inventory data
 *     tags: [Inventory]
 *     description: Permanently delete all inventory entries from the database
 *     responses:
 *       200:
 *         description: All inventory data cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All inventory data cleared successfully!"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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