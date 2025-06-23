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

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Allow all origins

// Serve static files
app.use(express.static('public'));

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Artisanal Business Hub API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    docExpansion: 'list',
    filter: true,
    showRequestHeaders: true,
    tryItOutEnabled: true
  }
}));

// Root route - redirect to documentation
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/csv', csvRoutes);

/**
 * @swagger
 * /api/reset:
 *   delete:
 *     summary: Reset all database data
 *     tags: [Database]
 *     description: Permanently delete all inventory and workflow data from the database
 *     responses:
 *       200:
 *         description: All database data cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All database data cleared successfully!"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
      console.log(`📚 API Documentation available at: http://localhost:${PORT}/api-docs`);
      console.log(`🏠 Documentation homepage: http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
