# Artisanal Business Hub - Inventory & Workflow Management System

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-orange.svg)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

A modern, full-stack web application designed specifically for artisanal businesses to manage inventory, track worker payments, and monitor cash flow. Built with React, Node.js, Express, and MongoDB.

## 🌟 Features

### 📦 Inventory Management
- **Dual Transaction Types**: Track both income and expenses with detailed categorization
- **Real-time Validation**: Form validation with error handling and user feedback
- **Date Tracking**: Automatic date stamping with custom date selection
- **CSV Import/Export**: Bulk data operations for easy backup and migration
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

### 👥 Worker Payment Tracking
- **Worker Profiles**: Manage individual artisan payments and work assignments
- **Payment Scheduling**: Track payment amounts, dates given, and expected completion dates
- **Work Descriptions**: Detailed work descriptions with character limits and validation
- **Status Management**: Mark work as received with completion tracking
- **Pending Work Dashboard**: Real-time overview of outstanding payments

### 📊 Financial Analytics
- **Cash Flow Dashboard**: Real-time financial metrics and summaries
- **Income/Expense Tracking**: Comprehensive financial reporting
- **Net Profit Calculation**: Automatic calculation of business profitability
- **Payment Due Tracking**: Monitor outstanding worker payments
- **Visual Statistics**: Beautiful, animated stat cards with color-coded indicators

### 🎨 Modern UI/UX
- **Dark/Light Mode**: Toggle between themes with persistent preferences
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Layout**: Adaptive design that works on all screen sizes
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: User-friendly error messages and validation feedback

### 🔧 Technical Features
- **Real-time Updates**: Live data synchronization across all components
- **Data Persistence**: MongoDB integration with Mongoose ODM
- **RESTful API**: Clean, well-structured backend API
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Configuration**: Environment variable support for configuration

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/inventory-workflow-app.git
   cd inventory-workflow-app
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # In the backend directory, create a .env file
   cd ../backend
   touch .env
   ```

   Add the following to your `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/artisanal-business
   PORT=5000
   ```

4. **Start the application**
   ```bash
   # Start backend server (from backend directory)
   npm run dev
   
   # Start frontend development server (from frontend directory)
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
inventory-workflow-app/
├── backend/                 # Node.js/Express backend
│   ├── models/             # MongoDB schemas
│   │   ├── Inventory.js    # Inventory data model
│   │   └── Workflow.js     # Worker payment model
│   ├── routes/             # API route handlers
│   │   ├── inventoryRoutes.js
│   │   ├── workflowRoutes.js
│   │   ├── summaryRoutes.js
│   │   └── csvRoutes.js
│   ├── server.js           # Express server setup
│   └── package.json
├── frontend/               # React frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── App.js          # Main app component
│   │   ├── Dashboard.jsx   # Main dashboard component
│   │   ├── index.js        # React entry point
│   │   └── input.css       # Tailwind CSS
│   ├── tailwind.config.js  # Tailwind configuration
│   └── package.json
└── README.md
```

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Inventory Endpoints

#### `POST /inventory`
Add a new inventory entry.

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

#### `DELETE /inventory`
Clear all inventory data.

### Workflow Endpoints

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

### Summary Endpoints

#### `GET /summary`
Get financial summary with optional filtering.

**Query Parameters:**
- `start`: Start date (YYYY-MM-DD)
- `end`: End date (YYYY-MM-DD)
- `item`: Filter by item name
- `worker`: Filter by worker name

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

#### `GET /csv/export/:collection`
Export data to CSV format.
- `:collection` can be `inventory` or `workflows`

#### `POST /csv/import/:collection`
Import data from CSV file.
- `:collection` can be `inventory` or `workflows`
- Requires multipart form data with `file` field

### Database Management

#### `DELETE /reset`
Clear all database data (inventory and workflows).

## 🎯 Usage Guide

### Adding Inventory Items

1. Navigate to the **Inventory** tab
2. Fill in the item details:
   - **Item Name**: Description of the material/product
   - **Amount**: Cost in rupees (₹)
   - **Type**: Select "Income" for sales or "Expense" for purchases
   - **Date**: Transaction date
3. Click "Save Inventory"

### Managing Worker Payments

1. Navigate to the **Workflow** tab
2. Enter worker information:
   - **Worker Name**: Artisan's name
   - **Payment Amount**: Amount to be paid
   - **Work Description**: Detailed description of the work
   - **Date Given**: When the work was assigned
   - **Expected Completion**: Expected completion date
3. Click "Save Workflow"

### Tracking Work Progress

- View pending work in the **Work In Progress** section
- Click the checkmark button to mark work as received
- Monitor total money owed to workers
- Track completion dates and payment status

### Data Management

- **Export Data**: Download CSV files for backup or analysis
- **Import Data**: Upload CSV files to bulk import data
- **Reset Database**: Clear all data (use with caution)

## 🛠️ Development

### Backend Development

```bash
cd backend
npm run dev  # Start with nodemon for auto-reload
```

### Frontend Development

```bash
cd frontend
npm start    # Start React development server
```

### Building for Production

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## 🧪 Testing

The application includes comprehensive error handling and validation:

- **Form Validation**: Real-time input validation with error messages
- **API Error Handling**: Proper HTTP status codes and error responses
- **Data Integrity**: MongoDB schema validation
- **User Feedback**: Success/error notifications and loading states

## 🔒 Security Considerations

- **Input Validation**: All user inputs are validated on both frontend and backend
- **CORS Configuration**: Properly configured for development and production
- **Environment Variables**: Sensitive configuration stored in environment variables
- **Data Sanitization**: CSV import data is cleaned and validated

## 🚀 Deployment

### Backend Deployment (Heroku Example)

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set MONGO_URI=your_mongodb_connection_string
   heroku config:set NODE_ENV=production
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Netlify Example)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- **Issues**: Create an issue on GitHub
- **Documentation**: Check the inline code comments
- **Community**: Join our discussion forum

## 🙏 Acknowledgments

- **React** - Frontend framework
- **Express.js** - Backend framework
- **MongoDB** - Database
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## 📊 Performance

- **Frontend**: Optimized React components with lazy loading
- **Backend**: Efficient MongoDB queries with proper indexing
- **Database**: Optimized schemas for fast data retrieval
- **Caching**: Client-side state management for improved UX

---

**Built with ❤️ for artisanal businesses worldwide**

