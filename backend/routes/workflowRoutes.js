const express = require('express');
const router = express.Router();
const Workflow = require('../models/Workflow');

// POST /api/workflows
router.post('/', async (req, res) => {
  try {
    const { workerName, paymentAmount, dateGiven, expectedCompletionDate, workDescription } = req.body;

const newWorkflow = new Workflow({
  workerName,
  paymentAmount,
  dateGiven,
  expectedCompletionDate,
  workDescription // ✅ include this
});


    await newWorkflow.save();
    res.status(201).json({ message: 'Workflow added!', workflow: newWorkflow });
  } catch (error) {
    console.error('❌ Error saving workflow:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/workflows
router.get('/', async (req, res) => {
  try {
    const allWorkflows = await Workflow.find().sort({ dateGiven: -1 });
    res.status(200).json(allWorkflows);
  } catch (error) {
    console.error('❌ Error fetching workflows:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/workflows/:id - Update workflow (mark as received)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { dateReceived } = req.body;

    const updatedWorkflow = await Workflow.findByIdAndUpdate(
      id,
      { dateReceived },
      { new: true }
    );

    if (!updatedWorkflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    res.status(200).json({ message: 'Workflow updated successfully!', workflow: updatedWorkflow });
  } catch (error) {
    console.error('❌ Error updating workflow:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/workflows - Clear all workflow data
router.delete('/', async (req, res) => {
  try {
    await Workflow.deleteMany({});
    res.status(200).json({ message: 'All workflow data cleared successfully!' });
  } catch (error) {
    console.error('❌ Error clearing workflows:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
