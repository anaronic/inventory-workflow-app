const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const Workflow = require('../models/Workflow');

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
