# BudgetNest

BudgetNest is a React Native mobile application for personal finance management, offering expense tracking, budget overviews, and visual financial analytics through interactive charts.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [Contributing](#contributing)

## Features

- **Financial Overview**: Dashboard with current balance and recent transactions
- **Expense Tracking**: Add/Edit/Delete income and expense records
- **Visual Analytics**: Interactive charts for spending patterns
- **Monthly Budgeting**: Set and track monthly budgets
- **Category Management**: Manage income and expense categories
- **Calendar View**: View transactions in a calendar format
- **Summary View**: Summary of income, expenses, and savings

## Technology Stack

### Frontend
- **React Native** - Cross-platform mobile framework
- **React Navigation** - Screen navigation management
- **React Native Vector Icons** - Icon library
- **React Native SVG Charts** - for PieChart

### Backend
- **Node.js** - Runtime environment
- **Express.js** - REST API framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Utilities
- **Axios** - HTTP client
- **Moment.js** - Date/time manipulation
- **Dotenv** - Environment variable management

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/BudgetNest.git
cd BudgetNest
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd api
npm install
cd ..
```

## Configuration

### Backend Setup
1. Create `.env` in `/api` directory:
```env
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.ikel3.mongodb.net/
PORT=8000
```
*Replace url with your MongoDB credentials*

### Frontend Setup
1. Create `.env` in root directory:
```env
REACT_APP_BACKEND_URL=http://localhost:8000
```
*For Android emulator, use `http://<ip of ur computer>:8000` instead of localhost*

## Running the App

### Start Backend Server
```bash
cd api
npm start
```

### Start React Native Application

In a new terminal:
```bash
npx react-native run-android
# or for iOS
npx react-native run-ios
```

In another terminal:
```bash
npx react-native start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Note**: This application requires an active internet connection for MongoDB Atlas integration.