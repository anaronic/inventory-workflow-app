const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const inventoryRoutes = require('./routes/inventoryRoutes');
const app = express();
const workflowRoutes = require('./routes/workflowRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const csvRoutes = require('./routes/csvRoutes');
const cors = require('cors');
const Inventory = require('./models/Inventory');
const Workflow = require('./models/Workflow');

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Allow all origins

// Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/csv', csvRoutes);

// DELETE /api/reset - Clear all database data
app.delete('/api/reset', async (req, res) => {
  try {
    await Promise.all([
      Inventory.deleteMany({}),
      Workflow.deleteMany({})
    ]);
    res.status(200).json({ message: 'All database data cleared successfully!' });
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
