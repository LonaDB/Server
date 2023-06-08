# LonaDB

LonaDB is a simple database written in Node.js JavaScript that utilizes JSON files for data storage. The database supports creating users and tables and can be accessed using the LonaDB Client for JavaScript.

## Prerequisites

To run the LonaDB server, make sure you have the following software installed:

- Node.js (version 12 or above)
- npm (Node Package Manager)

## Installation

To install the LonaDB server, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/LonaDB/Server.git
```

2. Navigate to the project directory:

```bash
cd Server
```

3. Install the dependencies:

```bash
npm install
```

## Usage

To start the LonaDB server, run the following command:

```bash
node lona.js
```

The server will start running on the specified and port.

### LonaDB Client

To use the LonaDB database, you can utilize the LonaDB Client for JavaScript. Install it by running:

```bash
npm install lonadb-client
```

Here's an example of how to use the LonaDB client:

```javascript
const LonaDB = require("lonadb-client");

// Create a new instance of LonaDB client
const database = new LonaDB("Host", Port, "Login Name", "Login Password");
```

### Performing Database Operations

The LonaDB client provides methods to perform various operations on the database.

#### Setting a Value

To set a value in the database, use the `set` method:

```javascript
database.set("table", "name", "value");
```

Replace `"table"` with the name of the table, `"name"` with the name of the value, and `"value"` with the actual value you want to set.

#### Getting a Value

To retrieve a value from the database, use the `get` method:

```javascript
const value = database.get("table", "name");
console.log(value);
```

Replace `"table"` with the name of the table and `"name"` with the name of the value you want to retrieve. The method will return the corresponding value.

#### Removing a Value

To remove a value from the database, use the `remove` method:

```javascript
database.remove("table", "name");
```

Replace `"table"` with the name of the table and `"name"` with the name of the value you want to remove.

#### Creating a Table

To create a new table in the database, use the `createTable` method:

```javascript
database.createTable("table_name");
```

Replace `"table_name"` with the name of the table you want to create.

#### Managing Users (Administrator Only)

If you have administrative access, you can manage users using the LonaDB client.

##### Creating a User

To create a new user, use the `createUser` method:

```javascript
database.createUser("username", "password");
```

Replace `"username"` with the desired username and `"password"` with the user's password.

##### Deleting a User

To delete a user, use the `deleteUser` method:

```javascript
database.deleteUser("username");
```

Replace `"username"` with the username of the user you want to delete.

## Contributing

Contributions to the LonaDB project are welcome! If you encounter any issues or have suggestions for improvements, please open an issue in the [GitHub repository](https://github.com/LonaDB/Server).

## License

This project is licensed under the [AGPL-3.0 License](LICENSE). Feel free to use, modify, and distribute it
