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
   - `DB_HOST`: The host name of your MySQL database server.
   - `DB_PORT`: The port number of your MySQL database server.
   - `DB_DATABASE`: The name of the MySQL database you created for your project.
   - `DB_USERNAME`: The username for accessing the MySQL database.
   - `DB_PASSWORD`: The password for accessing the MySQL database.

# Installing Dependencies

1. Open a terminal in the root directory of your project.
2. Run the following command to install the project dependencies:

`npm install`

# Running the Application

1. After the installation is complete, run the following command to start the application:

`npm start`

2. The application will be running at `http://localhost:3000` by default.

Congratulations! You have successfully installed and started the back end of your project. You can now proceed with testing the API endpoints using Postman or any other HTTP client.
