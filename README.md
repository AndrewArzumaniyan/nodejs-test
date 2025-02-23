# User Balance Management Service

A simple web application for managing user balances using Node.js, Express, and PostgreSQL.
Details:
- I choose a PATCH method because this method does not need to be idempotent while a PUT method (which is also often used in similar tasks) does.
- ApiError.js for error handling where i add stack, errors and etc.
- Project structure:
```
src/
  ├── config/        # Configuration files
  ├── controllers/   # Request handlers
  ├── middlewares/   # Custom middleware
  ├── migrations/    # Database migrations
  ├── models/        # Database models
  ├── routes/        # Route definitions
  ├── services/      # Business logic
  ├── utils/         # Utility functions
  └── index.js       # Application entry point
```

## Requirements

- Node.js v20+
- PostgreSQL v14+

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd balance-management-app'
```

2. Install dependencies
```bash
npm i
```

3. Create .env file
```js
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=balance_app
DB_HOST=localhost
PORT=3000
NODE_ENV=development
```

4. Start application
```bash
npm start
```

The application will automatically:

- Connect to the database
- Run migrations
- Create an initial user with 10000 balance
- Start the server on 3000 port


## API Endpoints
### Update user balance
- URL: ```/api/users/:userId/balance```
- Method: ```PATCH```
- REQUEST BODY:
```
{
  "amount": 100 // Positive for adding, negative for subtracting
}
```
- Success response:
```
{
  "success": true,
  "data": {
    "userId": "uuid",
    "balance": 10100
  }
}
```
- Error response
```
{
  "success": false,
  "message": "Insufficient funds",
  "errors": []
}
```