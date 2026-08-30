# Zerodha Clone – Full Stack Trading Platform

A full-stack trading platform inspired by Zerodha, built using React.js, Node.js, Express.js and MongoDB.

The application provides user authentication, stock watchlist, buy/sell orders, holdings, positions, funds management, transactions and profit/loss tracking.

## 🚀 Features

- User Registration and Login
- JWT Authentication
- Protected Dashboard
- Stock Watchlist
- Search Stocks
- Buy Orders
- Sell Orders
- Order History
- Holdings Management
- Positions Tracking
- Funds Management
- Add Funds
- Withdraw Funds
- Transaction History
- Realized Profit/Loss
- Portfolio P/L Calculation
- Market Price Synchronization
- User Profile
- Logout
- Responsive Dashboard

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Bootstrap
- CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- REST API
- Nodemailer

### Database

- MongoDB

## 📂 Project Structure

```text
ZERODHA-CLONE/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── utils/
│   ├── App.js
│   └── package.json
│
├── dashboard/
│   ├── src/
│   │   ├── api/
│   │   ├── component/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── utils/
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── auth/
    │   ├── landing_page/
    │   ├── context/
    │   └── assets/
    └── package.json




    Trading Flow
Buy
User
 ↓
Watchlist
 ↓
Buy Modal
 ↓
POST /orders
 ↓
Order Created
 ↓
Holdings Updated
 ↓
Funds Updated
 ↓
Transaction Created
Sell
User
 ↓
Watchlist
 ↓
Sell Modal
 ↓
POST /orders
 ↓
Order Completed
 ↓
Holdings Updated
 ↓
Funds Released
 ↓
Realized P/L Calculated
 ↓
Transaction Created
📊 P/L Calculation

The application calculates portfolio profit/loss using:

Investment = Quantity × Average Price

Current Value = Quantity × Current Price

P/L = Current Value − Investment

P/L % = (P/L / Investment) × 100

## 🔐 Authentication

The application uses JWT-based authentication.

Protected APIs require an authenticated user token.

## 📌 API Modules

The backend provides REST APIs for:

- Authentication
- OTP Verification
- Password Management
- Funds
- Holdings
- Market Prices
- Orders
- Positions
- Transactions
- User Profile

## 🧪 Tested Features

- BUY Order — PASS
- SELL Order — PASS
- Funds Add — PASS
- Funds Withdraw — PASS
- Holdings Update — PASS
- Positions Update — PASS
- Orders — PASS
- Transactions — PASS
- Realized P/L — PASS

## 👨‍💻 Author

**Kali Prasad**

GitHub:  
https://github.com/Kaliprasad2387

## ⚠️ Disclaimer

This project is created for educational and portfolio purposes only.

It is not connected to or affiliated with the official Zerodha trading platform.

