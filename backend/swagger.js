const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Artisanal Business Hub API',
      version: '1.0.0',
      description: 'A comprehensive API for managing inventory, worker payments, and business analytics for artisanal businesses.',
      contact: {
        name: 'API Support',
        email: 'support@artisanalbusiness.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://your-production-domain.com',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        Inventory: {
          type: 'object',
          required: ['itemName', 'amount', 'transactionType'],
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the inventory item'
            },
            itemName: {
              type: 'string',
              description: 'Name or description of the item'
            },
            amount: {
              type: 'number',
              description: 'Amount in rupees (₹)',
              minimum: 0
            },
            transactionType: {
              type: 'string',
              enum: ['income', 'expense'],
              description: 'Type of transaction - income for sales, expense for purchases'
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Transaction date (defaults to current date)'
            }
          }
        },
        Workflow: {
          type: 'object',
          required: ['workerName', 'paymentAmount', 'dateGiven', 'expectedCompletionDate', 'workDescription'],
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the workflow'
            },
            workerName: {
              type: 'string',
              description: 'Name of the worker/artisan'
            },
            paymentAmount: {
              type: 'number',
              description: 'Payment amount in rupees (₹)',
              minimum: 0
            },
            dateGiven: {
              type: 'string',
              format: 'date',
              description: 'Date when work was assigned'
            },
            dateReceived: {
              type: 'string',
              format: 'date',
              description: 'Date when work was completed (optional)'
            },
            expectedCompletionDate: {
              type: 'string',
              format: 'date',
              description: 'Expected completion date'
            },
            workDescription: {
              type: 'string',
              description: 'Detailed description of the work to be done',
              maxLength: 200
            }
          }
        },
        Summary: {
          type: 'object',
          properties: {
            filteredBy: {
              type: 'object',
              properties: {
                item: { type: 'string' },
                worker: { type: 'string' },
                start: { type: 'string', format: 'date' },
                end: { type: 'string', format: 'date' }
              }
            },
            totalMoneyIn: {
              type: 'number',
              description: 'Total income from inventory transactions'
            },
            totalMoneyOut: {
              type: 'number',
              description: 'Total expenses from inventory transactions'
            },
            netInventoryProfit: {
              type: 'number',
              description: 'Net profit from inventory (income - expenses)'
            },
            totalWorkerPayments: {
              type: 'number',
              description: 'Total amount owed to workers'
            },
            netCashFlow: {
              type: 'number',
              description: 'Net cash flow (inventory profit - worker payments)'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message'
            },
            details: {
              type: 'string',
              description: 'Detailed error information (optional)'
            }
          }
        }
      },
      securitySchemes: {
        // Add authentication schemes here if needed in the future
      }
    },
    tags: [
      {
        name: 'Inventory',
        description: 'Inventory management operations'
      },
      {
        name: 'Workflows',
        description: 'Worker payment and workflow management'
      },
      {
        name: 'Summary',
        description: 'Financial summary and analytics'
      },
      {
        name: 'CSV Operations',
        description: 'Import and export data in CSV format'
      },
      {
        name: 'Database',
        description: 'Database management operations'
      }
    ]
  },
  apis: ['./routes/*.js', './server.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs; 