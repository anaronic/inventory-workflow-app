# Artisanal Business Hub - API Documentation

## 📚 Overview

The Artisanal Business Hub API provides comprehensive endpoints for managing inventory, worker payments, and business analytics. This API is built with Express.js, MongoDB, and follows RESTful principles.

## 🚀 Quick Start

### Base URL
```
http://localhost:5000/api
```

### Interactive Documentation
- **Swagger UI**: http://localhost:5000/api-docs
- **Documentation Homepage**: http://localhost:5000/

## 📋 API Endpoints

### Inventory Management

#### `POST /inventory`
Add a new inventory item.

**Request Body:**
```json
{
  "itemName": "Cotton Fabric",
  "amount": 1500.00,
  "transactionType": "expense",
  "date": "2024-01-15"
}
```

**Response:**
```json
{
  "message": "Item added successfully!",
  "item": {
    "_id": "...",
    "itemName": "Cotton Fabric",
    "amount": 1500,
    "transactionType": "expense",
    "date": "2024-01-15T00:00:00.000Z"
  }
}
```

#### `GET /inventory`
Retrieve all inventory entries (sorted by date, newest first).

**Query Parameters:**
- `limit` (optional): Maximum number of items to return (default: 50)
- `skip` (optional): Number of items to skip for pagination (default: 0)

#### `DELETE /inventory`
Clear all inventory data.

### Workflow Management

#### `POST /workflows`
Add a new worker payment entry.

**Request Body:**
```json
{
  "workerName": "John Doe",
  "paymentAmount": 500.00,
  "dateGiven": "2024-01-15",
  "expectedCompletionDate": "2024-01-30",
  "workDescription": "Hand-stitching 50 fabric pieces"
}
```

#### `GET /workflows`
Retrieve all workflow entries.

**Query Parameters:**
- `limit` (optional): Maximum number of workflows to return (default: 50)
- `skip` (optional): Number of workflows to skip for pagination (default: 0)
- `status` (optional): Filter by status ("pending" or "completed")

#### `PUT /workflows/:id`
Mark work as received.

**Request Body:**
```json
{
  "dateReceived": "2024-01-25"
}
```

#### `DELETE /workflows`
Clear all workflow data.

### Financial Analytics

#### `GET /summary`
Get financial summary with optional filtering.

**Query Parameters:**
- `start`: Start date (YYYY-MM-DD)
- `end`: End date (YYYY-MM-DD)
- `item`: Filter by item name (case-insensitive)
- `worker`: Filter by worker name (case-insensitive)

**Response:**
```json
{
  "filteredBy": {
    "item": "all",
    "worker": "all",
    "start": "2024-01-01",
    "end": "2024-01-31"
  },
  "totalMoneyIn": 5000,
  "totalMoneyOut": 2500,
  "netInventoryProfit": 2500,
  "totalWorkerPayments": 800,
  "netCashFlow": 1700
}
```

### CSV Operations

#### `GET /csv/export/{collection}`
Export data to CSV format.
- `{collection}` can be `inventory` or `workflows`

#### `POST /csv/import/{collection}`
Import data from CSV file.
- `{collection}` can be `inventory` or `workflows`
- Requires multipart form data with `file` field

### Database Management

#### `DELETE /reset`
Clear all database data (inventory and workflows).

## 📊 Data Models

### Inventory Schema
```javascript
{
  _id: ObjectId,
  itemName: String (required),
  amount: Number (required, minimum: 0),
  transactionType: String (required, enum: ['income', 'expense']),
  date: Date (default: current date)
}
```

### Workflow Schema
```javascript
{
  _id: ObjectId,
  workerName: String (required),
  paymentAmount: Number (required, minimum: 0),
  dateGiven: Date (required),
  dateReceived: Date (optional),
  expectedCompletionDate: Date (required),
  workDescription: String (required, maxLength: 200)
}
```

## 🔧 Error Handling

All endpoints return appropriate HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (invalid input)
- `404`: Not Found
- `500`: Internal Server Error

Error responses follow this format:
```json
{
  "message": "Error description",
  "details": "Additional error information (optional)"
}
```

## 🧪 Testing the API

### Using Swagger UI
1. Navigate to http://localhost:5000/api-docs
2. Click on any endpoint to expand it
3. Click "Try it out" to test the endpoint
4. Fill in the required parameters
5. Click "Execute" to make the request

### Using cURL Examples

**Add Inventory Item:**
```bash
curl -X POST http://localhost:5000/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "Cotton Fabric",
    "amount": 1500.00,
    "transactionType": "expense",
    "date": "2024-01-15"
  }'
```

**Get Financial Summary:**
```bash
curl -X GET "http://localhost:5000/api/summary?start=2024-01-01&end=2024-01-31"
```

**Export Inventory to CSV:**
```bash
curl -X GET http://localhost:5000/api/csv/export/inventory \
  -H "Accept: text/csv" \
  --output inventory_export.csv
```

## 🔒 Security Considerations

- **Input Validation**: All inputs are validated on both frontend and backend
- **CORS**: Configured for development and production environments
- **Data Sanitization**: CSV import data is cleaned and validated
- **Error Handling**: Sensitive information is not exposed in error messages

## 🚀 Deployment

### Environment Variables
```env
MONGO_URI=mongodb://localhost:27017/artisanal-business
PORT=5000
NODE_ENV=production
```

### Production Considerations
- Update the server URLs in `swagger.js` for production
- Configure CORS for your production domain
- Set up proper MongoDB connection with authentication
- Enable HTTPS in production

## 📝 Contributing

When adding new endpoints:

1. Add Swagger documentation comments above the route
2. Include proper request/response schemas
3. Add examples for better understanding
4. Update this documentation file
5. Test the endpoint using Swagger UI

## 🆘 Support

For API support and questions:
- Check the interactive Swagger documentation
- Review the inline code comments
- Create an issue on GitHub for bugs or feature requests

---

**Built with ❤️ for artisanal businesses worldwide** 