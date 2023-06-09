# Stock-control and Sales system

This is the backend of a stock-control and sales system. It's built using Express.js and MySQL for data storage. The system is ready for an UI with some Frontend work.

## Features

- Populate the database from API
- Create one (1) admin user
- Create users - up to 4 with the same email address
- A discount is generated if 2 or more have the same email address (2 users - 10%, 3 users - 30%, 4 users - 40%)
- Login authenticated with JWT token
- Every new user gets an cart of wich they can add items to
- Users can order items from the cart if there is enough items in stock
- Users can see all their orders and status of their order
- Admin can edit the status of an users order ['In process', 'Complete', 'Cancelled']
- Admin can see all orders and carts
- Anyone can use the search function to search for item names, item sku, category etc

## Unit testing

1. There is provided an test, that can be run with the command `npm test`, keep in mind that this test must be run on an empty/unpopulated database.

# Installation

1. Clone the repository or download the source code.
2. Open the project in Visual Studio Code (`VSCode`) or your preferred code editor.

## Prerequisites

1. Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download and install them from the official Node.js website: [Node.js](https://nodejs.org)

# Setting Up the Database

1. Install MySQL on your system if you haven't already. You can download it from the official MySQL website: [MySQL](https://dev.mysql.com/downloads)
2. Create a new MySQL database for your project.

# Configuration

1. Open the `.env` file and update the following configuration variables according to your setup:

   - `HOST`: The host name of your MySQL database server.
   - `PORT`: The port number of your MySQL database server.
   - `DATABASE_NAME`: The name of the MySQL database you created for your project.
   - `ADMIN_USERNAME`: The username for accessing the MySQL database.
   - `ADMIN_PASSWORD`: The password for accessing the MySQL database.
   - `DIALECT`: "mysql"
   - `JWT_SECRET`: JWT Secret.

   HOST = "localhost"
   ADMIN_USERNAME = "root"
   ADMIN_PASSWORD = "neiseida"
   DATABASE_NAME = "StockSalesDB"
   DIALECT = "mysql"
   PORT = "3000"
   JWT_SECRET=your-secret

# Installing Dependencies

1. Open a terminal in the root directory of your project.
2. Run the following command to install the project dependencies:

```bash
npm install
```

# Running the Application

1. After the installation is complete, run the following command to start the application:

```bash
npm start
```

2. The application will be running at `http://localhost:3000` by default.

Congratulations! You have successfully installed and started the back end of your project. You can now proceed with testing the API endpoints using Postman or any other HTTP client.
