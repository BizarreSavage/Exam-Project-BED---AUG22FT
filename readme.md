# Stock-control and Sales system

This is the backend of a stock-control and sales system, here you can browse items in a catalogue, add them to your cart and order them. The program is complete with admin control and user registration. It's built using Express.js and MySQL for data storage. The system is ready for an UI with some Frontend work.

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

# Endpoints

### Authentication Endpoints

- `POST /login`: Used for user login. Returns a JWT token for valid logins.
- `POST /signup`: Used for user registration.

### Items Endpoints

- `GET /items`: Returns all items in the database, including their categories.
- `POST /item`: Adds a new item to the database (admin access required).
- `PUT /item/:id`: Updates an existing item in the database (admin access required).
- `DELETE /item/:id`: Deletes an item from the database (admin access required).

### Category Endpoints

- `GET /categories`: Returns all categories in the database.
- `POST /category`: Adds a new category to the database (admin access required).
- `PUT /category/:id`: Updates the name of a category (admin access required).
- `DELETE /category/:id`: Deletes a category from the database (admin access required).

### Cart Endpoints

- `GET /cart`: Returns the cart for the logged-in user.
- `GET /allcarts`: Returns all carts, including items and user information (admin access required).
- `POST /cart_item`: Adds an item to the user's cart.
- `PUT /cart_item/:id`: Updates the quantity of an item in the user's cart.
- `DELETE /cart_item/:id`: Deletes an item from the user's cart.
- `DELETE /cart/:id`: Deletes all items from the user's cart.

### Orders Endpoint

- `GET /orders`: Returns the orders for the logged-in user, and returns all orders for admin.
- `GET /allorders`: Returns all orders, including items and user information (admin access required).
- `POST /order/:id`: Adds an item from the user's cart to an order.
- `PUT /order/:id`: Updates the status of an order (admin access required).

### Utility Endpoints

- `POST /setup`: Populates the database with initial data if no records exist, this data is fetched from an API, it also creates the admin user.
- `POST /search`: Searches for items or categories in the database, can also search with partial names.

# Installation

1. Clone the repository or download the source code.
2. Open the project in Visual Studio Code (`VSCode`) or your preferred code editor.

## Prerequisites

1. Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download and install them from the official Node.js website: [Node.js](https://nodejs.org)

# Setting Up the Database

1. Install MySQL on your system if you haven't already. You can download it from the official MySQL website: [MySQL](https://dev.mysql.com/downloads)
2. Create a new MySQL database for your project. For this project I used these commands in MySQL:

```javascript
create database stocksalesdb;
CREATE USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'P@ssw0rd';
ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'P@ssw0rd';
GRANT ALL PRIVILEGES ON stocksalesdb.* TO 'admin'@'localhost';
```

# Configuration

NB! .env file is not included and .gitignored due to best practices and security.

1. Create the `.env` file and provide the following configuration variables:

```javascript
   - HOST= "localhost" //The host name of your MySQL database server.
   - PORT= "3000" //The port number of your MySQL database server.
   - DATABASE_NAME= "StockSalesDB" //The name of the MySQL database you created for your project.
   - ADMIN_USERNAME= "admin" //The username for accessing the MySQL database.
   - ADMIN_PASSWORD= "P@ssw0rd" //The password for accessing the MySQL database.
   - DIALECT= "mysql"
   - JWT_SECRET=thisIsSoVerySecret1337
```

# Installing Dependencies

1. Open a terminal in the root directory of your project.
2. Run the following command to install the project dependencies:

```bash
npm install
```

# Unit testing

1. There is provided an test, that can be run with the command `npm test`, keep in mind that this test must be run on an empty/unpopulated database.

- During the final days of the exam our test task was changed, but they allowed us to keep our old tests so the tests provided here will test admin endpoints with an admin user. See here:

```
As instructions were updated once the EP had already begun,
Test 3 and Test 8 can use either the Admin or a User - both are acceptable.
```

# Running the Application

1. After the installation is complete, run the following command to start the application:

```bash
npm start
```

2. The application will be running at `http://localhost:3000` by default.

3. Use "Postman" or some other tool to send a `post` request to `/setup` to populate the database and create the admin user.(If you ran `npm test` first, then database is already populated.)

Congratulations! You have successfully installed and started the back end of your project.

## Dependencies

- axios: ^1.4.0
- bcrypt: ^5.1.0
- cookie-parser: ~1.4.4
- cors: ^2.8.5
- debug: ~2.6.9
- dotenv: ^16.1.3
- express: ^4.18.2
- jest: ^29.5.0
- jsonwebtoken: ^9.0.0
- morgan: ~1.9.1
- mysql2: ^3.3.3
- sequelize: ^6.31.1
- sequelize-cli: ^6.6.0
- supertest: ^6.3.3

## Collaboration

I signed up for a mentor group with Hans Christian Gustafsson, we spoke alot about how to interpret the task. However, we never helped each other with any code, only with understanding the exam task text.

## License

This project is licensed under the MIT License.
