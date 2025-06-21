# 🏪 Inventory & Workflow Management System

A modern, full-stack web application designed for small businesses to manage inventory transactions and track worker payments. Built with React, Node.js, Express, and MongoDB, featuring a beautiful, responsive UI with dark mode support.

![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.16.0-green?logo=mongodb)
![Express](https://img.shields.io/badge/Express-5.1.0-gray?logo=express)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.5-38B2AC?logo=tailwind-css)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This application is specifically designed for small businesses, particularly those in artisanal or craft industries, to efficiently manage their financial operations. It provides a comprehensive solution for tracking inventory transactions (income/expenses) and managing worker payments with a focus on workflow completion tracking.

### Key Benefits

- **Real-time Financial Tracking**: Monitor income, expenses, and net cash flow
- **Worker Payment Management**: Track payments to artisans/workers with completion status
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Eye-friendly interface for different lighting conditions
- **Data Persistence**: Secure MongoDB storage with automatic backups
- **Modern UI/UX**: Intuitive interface with smooth animations and transitions

## ✨ Features

### 📊 Inventory Management
- **Transaction Tracking**: Record income and expense transactions
- **Item Details**: Store item names, amounts, and transaction dates
- **Real-time Updates**: Instant reflection of financial changes
- **Data Validation**: Comprehensive input validation and error handling

### 👥 Workflow Management
- **Worker Profiles**: Track individual worker payments and assignments
- **Payment Tracking**: Monitor payment amounts and due dates
- **Completion Status**: Mark work as received when completed
- **Work Descriptions**: Detailed descriptions for each work assignment
- **Expected Completion Dates**: Set and track project timelines

### 📈 Financial Analytics
- **Financial Summary**: Overview of total income, expenses, and net profit
- **Cash Flow Analysis**: Real-time net cash flow calculations
- **Pending Payments**: Track money owed to workers
- **Workflow Statistics**: Monitor pending vs. completed work

### 🎨 User Experience
- **Responsive Design**: Optimized for all screen sizes
- **Dark/Light Mode**: Toggle between themes for user preference
- **Loading States**: Smooth loading animations and feedback
- **Error Handling**: Comprehensive error messages and validation
- **Activity Logs**: Track all system activities and changes

## 🛠 Tech Stack

### Frontend
- **React 19.1.0**: Modern UI library with hooks
- **Tailwind CSS 3.3.5**: Utility-first CSS framework
- **Axios**: HTTP client for API communication
- **PostCSS & Autoprefixer**: CSS processing and optimization

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js 5.1.0**: Web application framework
- **MongoDB 8.16.0**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Development Tools
- **Create React App**: React development environment
- **Nodemon**: Development server with auto-restart
- **npm**: Package manager

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **MongoDB** (v5 or higher) - Local installation or MongoDB Atlas account
- **Git** (for cloning the repository)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/inventory-workflow-app.git
cd inventory-workflow-app
```

### 2. Install Dependencies

Install backend dependencies:
```bash
cd backend
npm install
```

Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `backend` directory:

```bash
cd ../backend
touch .env
```

Add the following environment variables:

```env
MONGO_URI=mongodb://localhost:27017/inventory-workflow
PORT=5000
NODE_ENV=development
```

**Note**: Replace the MongoDB URI with your actual database connection string. For MongoDB Atlas, use the connection string provided in your cluster dashboard.

## ⚙️ Configuration

### MongoDB Setup

#### Local MongoDB
1. Install MongoDB on your system
2. Start the MongoDB service
3. Create a database named `inventory-workflow`

#### MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace `MONGO_URI` in your `.env` file

### Port Configuration

The application uses the following default ports:
- **Backend**: 5000
- **Frontend**: 3000

You can modify these in the respective configuration files if needed.

## 🎮 Usage

### Starting the Application

#### Development Mode

1. **Start the Backend Server**:
   ```bash
   cd backend
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the Frontend Development Server**:
   ```bash
   cd frontend
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`

#### Production Mode

1. **Build the Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the Production Server**:
   ```bash
   cd backend
   npm start
   ```

### Using the Application

#### Inventory Management
1. Navigate to the "Inventory" tab
2. Fill in the item details:
   - **Item Name**: Name of the product/material
   - **Amount**: Transaction amount in rupees (₹)
   - **Type**: Select "Income" or "Expense"
   - **Date**: Transaction date
3. Click "Save Inventory" to record the transaction

#### Workflow Management
1. Navigate to the "Workflow" tab
2. Enter worker details:
   - **Worker Name**: Name of the artisan/worker
   - **Amount**: Payment amount in rupees (₹)
   - **Work Description**: Detailed description of the work
   - **Date Given**: When the work was assigned
   - **Expected Completion**: Expected completion date
3. Click "Save Workflow" to create the work assignment

#### Tracking Completion
1. View pending work in the "Work In Progress" section
2. Click the checkmark button to mark work as received
3. The payment will be moved to completed status

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Inventory Endpoints

#### POST `/inventory`
Create a new inventory transaction.

**Request Body:**
```json
{
  "itemName": "Cotton Fabric",
  "amount": 1500,
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

#### GET `/inventory`
Retrieve all inventory transactions.

**Response:**
```json
[
  {
    "_id": "...",
    "itemName": "Cotton Fabric",
    "amount": 1500,
    "transactionType": "expense",
    "date": "2024-01-15T00:00:00.000Z"
  }
]
```

#### DELETE `/inventory`
Clear all inventory data.

### Workflow Endpoints

#### POST `/workflows`
Create a new workflow assignment.

**Request Body:**
```json
{
  "workerName": "John Doe",
  "paymentAmount": 800,
  "dateGiven": "2024-01-15",
  "expectedCompletionDate": "2024-01-20",
  "workDescription": "Dye 10 pieces of fabric"
}
```

#### GET `/workflows`
Retrieve all workflow assignments.

#### PUT `/workflows/:id`
Mark a workflow as received.

**Request Body:**
```json
{
  "dateReceived": "2024-01-18"
}
```

#### DELETE `/workflows`
Clear all workflow data.

### Summary Endpoints

#### GET `/summary`
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
  "totalWorkerPayments": 1200,
  "netCashFlow": 1300
}
```

### Utility Endpoints

#### DELETE `/reset`
Clear all database data (inventory and workflows).

## 📁 Project Structure

```
inventory-workflow-app/
├── backend/                 # Backend server
│   ├── models/             # MongoDB schemas
│   │   ├── Inventory.js    # Inventory model
│   │   └── Workflow.js     # Workflow model
│   ├── routes/             # API routes
│   │   ├── inventoryRoutes.js
│   │   ├── workflowRoutes.js
│   │   └── summaryRoutes.js
│   ├── server.js           # Express server
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables
├── frontend/               # React application
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── App.js         # Main app component
│   │   ├── Dashboard.jsx  # Main dashboard
│   │   ├── index.js       # Entry point
│   │   └── input.css      # Tailwind CSS
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind configuration
├── README.md              # This file
└── package.json           # Root package.json
```

## 🤝 Contributing

We are preparing to welcome contributions to improve this project! Please follow these steps:

### 1. Fork the Repository
Fork the project to your GitHub account.

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes
- Write clean, well-documented code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### 4. Commit Your Changes
```bash
git commit -m "feat: add new feature description"
```

### 5. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request
Submit a pull request with a detailed description of your changes.

### Development Guidelines

- **Code Style**: Follow ESLint configuration
- **Commits**: Use conventional commit messages
- **Testing**: Ensure all tests pass before submitting
- **Documentation**: Update README and API docs for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. **Check the Issues**: Search existing issues for similar problems
2. **Create an Issue**: Provide detailed information about your problem
3. **Contact**: Reach out to the maintainers

### Common Issues

#### MongoDB Connection Issues
- Ensure MongoDB is running
- Check your connection string in `.env`
- Verify network connectivity

#### Port Conflicts
- Change the port in `backend/server.js` if 5000 is occupied
- Update the proxy in `frontend/package.json` accordingly

#### Build Issues
- Clear `node_modules` and reinstall dependencies
- Ensure you're using the correct Node.js version

## 🔮 Roadmap

### Planned Features
- [ ] User authentication and authorization
- [ ] Advanced reporting and analytics
- [ ] Export functionality (PDF, Excel)
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced filtering and search
- [ ] Data backup and restore

### Performance Improvements
- [ ] Database indexing optimization
- [ ] Caching implementation
- [ ] Image compression and optimization
- [ ] Lazy loading for large datasets

---

**Made with ❤️ for small businesses**

For more information, visit our [documentation](docs/) or [contribute](CONTRIBUTING.md) to the project.
