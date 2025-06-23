const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const Workflow = require('../models/Workflow');

/**
 * @swagger
 * /api/summary:
 *   get:
 *     summary: Get financial summary and analytics
 *     tags: [Summary]
 *     description: Retrieve comprehensive financial summary including income, expenses, worker payments, and cash flow with optional filtering
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering (YYYY-MM-DD format)
 *         example: "2024-01-01"
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering (YYYY-MM-DD format)
 *         example: "2024-01-31"
 *       - in: query
 *         name: item
 *         schema:
 *           type: string
 *         description: Filter inventory by item name (case-insensitive partial match)
 *         example: "cotton"
 *       - in: query
 *         name: worker
 *         schema:
 *           type: string
 *         description: Filter workflows by worker name (case-insensitive partial match)
 *         example: "john"
 *     responses:
 *       200:
 *         description: Financial summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Summary'
 *             examples:
 *               default:
 *                 summary: Default summary
 *                 value:
 *                   filteredBy:
 *                     item: "all"
 *                     worker: "all"
 *                     start: "2024-01-01"
 *                     end: "2024-01-31"
 *                   totalMoneyIn: 5000
 *                   totalMoneyOut: 2500
 *                   netInventoryProfit: 2500
 *                   totalWorkerPayments: 800
 *                   netCashFlow: 1700
 *               filtered:
 *                 summary: Filtered summary
 *                 value:
 *                   filteredBy:
 *                     item: "cotton"
 *                     worker: "john"
 *                     start: "2024-01-15"
 *                     end: "2024-01-30"
 *                   totalMoneyIn: 2000
 *                   totalMoneyOut: 1500
 *                   netInventoryProfit: 500
 *                   totalWorkerPayments: 300
 *                   netCashFlow: 200
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', async (req, res) => {
  try {
    const { start, end, item, worker } = req.query;

    const startDate = start ? new Date(start) : new Date('1970-01-01');
    const endDate = end ? new Date(end) : new Date();
    endDate.setDate(endDate.getDate() + 1); // include full end date

    // Build inventory query
    const inventoryQuery = {
      date: { $gte: startDate, $lt: endDate }
    };
    if (item) {
      inventoryQuery.itemName = { $regex: new RegExp(item, 'i') }; // case-insensitive match
    }

    const inventoryData = await Inventory.find(inventoryQuery);
    let moneyIn = 0, moneyOut = 0;
    inventoryData.forEach(entry => {
      if (entry.transactionType === 'income') moneyIn += entry.amount;
      else if (entry.transactionType === 'expense') moneyOut += entry.amount;
    });

    // Build workflow query
    const workflowQuery = {
      dateGiven: { $gte: startDate, $lt: endDate }
    };
    if (worker) {
      workflowQuery.workerName = { $regex: new RegExp(worker, 'i') }; // case-insensitive
    }

    const workflowData = await Workflow.find(workflowQuery);
    let paymentsDue = 0;
    workflowData.forEach(wf => paymentsDue += wf.paymentAmount);

    res.status(200).json({
      filteredBy: {
        item: item || 'all',
        worker: worker || 'all',
        start: startDate.toISOString().split('T')[0],
        end: new Date(endDate - 1).toISOString().split('T')[0]
      },
      totalMoneyIn: moneyIn,
      totalMoneyOut: moneyOut,
      netInventoryProfit: moneyIn - moneyOut,
      totalWorkerPayments: paymentsDue,
      netCashFlow: moneyIn - moneyOut - paymentsDue
    });
  } catch (err) {
    console.error('❌ Filtered summary error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
