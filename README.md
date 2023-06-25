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

If you don't have a config file already, the setup script will run you through defining your port and creating your initial user, who has ALL permissions.
Also, if there are no Tables, the setup script will create one named 'Default' for you.

## Contributing

Contributions to the LonaDB project are welcome! If you encounter any issues or have suggestions for improvements, please open an issue in the [GitHub repository](https://github.com/LonaDB/Server).

## License

This project is licensed under the [AGPL-3.0 License](LICENSE). Feel free to use, modify, and distribute it
