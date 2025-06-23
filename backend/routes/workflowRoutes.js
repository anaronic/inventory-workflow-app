const express = require('express');
const router = express.Router();
const Workflow = require('../models/Workflow');

/**
 * @swagger
 * /api/workflows:
 *   post:
 *     summary: Add a new workflow entry
 *     tags: [Workflows]
 *     description: Create a new workflow entry to track worker payments and assignments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - workerName
 *               - paymentAmount
 *               - dateGiven
 *               - expectedCompletionDate
 *               - workDescription
 *             properties:
 *               workerName:
 *                 type: string
 *                 description: Name of the worker/artisan
 *                 example: "John Doe"
 *               paymentAmount:
 *                 type: number
 *                 description: Payment amount in rupees (₹)
 *                 minimum: 0
 *                 example: 500.00
 *               dateGiven:
 *                 type: string
 *                 format: date
 *                 description: Date when work was assigned
 *                 example: "2024-01-15"
 *               expectedCompletionDate:
 *                 type: string
 *                 format: date
 *                 description: Expected completion date
 *                 example: "2024-01-30"
 *               workDescription:
 *                 type: string
 *                 description: Detailed description of the work to be done
 *                 maxLength: 200
 *                 example: "Hand-stitching 50 fabric pieces"
 *     responses:
 *       201:
 *         description: Workflow entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Workflow added!"
 *                 workflow:
 *                   $ref: '#/components/schemas/Workflow'
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

/**
 * @swagger
 * /api/workflows:
 *   get:
 *     summary: Get all workflow entries
 *     tags: [Workflows]
 *     description: Retrieve all workflow entries sorted by date given (newest first)
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Maximum number of workflows to return
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of workflows to skip for pagination
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed]
 *         description: Filter by workflow status
 *     responses:
 *       200:
 *         description: List of workflow entries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workflow'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', async (req, res) => {
  try {
    const allWorkflows = await Workflow.find().sort({ dateGiven: -1 });
    res.status(200).json(allWorkflows);
  } catch (error) {
    console.error('❌ Error fetching workflows:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/workflows/{id}:
 *   put:
 *     summary: Update workflow (mark as received)
 *     tags: [Workflows]
 *     description: Mark a workflow as completed by adding a received date
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workflow ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dateReceived
 *             properties:
 *               dateReceived:
 *                 type: string
 *                 format: date
 *                 description: Date when work was completed
 *                 example: "2024-01-25"
 *     responses:
 *       200:
 *         description: Workflow updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Workflow updated successfully!"
 *                 workflow:
 *                   $ref: '#/components/schemas/Workflow'
 *       404:
 *         description: Workflow not found
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

/**
 * @swagger
 * /api/workflows:
 *   delete:
 *     summary: Clear all workflow data
 *     tags: [Workflows]
 *     description: Permanently delete all workflow entries from the database
 *     responses:
 *       200:
 *         description: All workflow data cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All workflow data cleared successfully!"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
