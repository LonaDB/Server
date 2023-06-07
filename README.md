# LonaDB

LonaDB is my 3rd attempt in creating my own "database".
Please keep in mind that this is a early prototype.

- 1st attempt: [ShinoaDB](https://github.com/Hanyaku-Chan/ShinoaDB)
- 2nd attempt: [AnbuDB](https://github.com/Hanyaku-Chan/AnbuDB)

## Installation.

```bash
git clone https://github.com/LonaDB/Server
cd Server

npm i
```

## Usage

To use LonaDB, you have to use the [LonaDB Client](https://github.com/LonaDB/JavaScript-Client) for JavaScript or create your own Client.

```javascript
let LonaDB = require("lonadb-client");
let database1 = new LonaDB("Host", Port, "Login Name", "Login Password");
```

You can currently do:
- LonaDB.set(table, name, value)
- LonaDB.get(table, name)
- LonaDB.remove(table, name)
- LonaDB.createTable(name)


And you can manage users if you have access to the Administrator user:
- LonaDB.createUser(name, password)
- LonaDB.deleteUser(name)

The users created can be used to access the database. (What else should we use them for? Any suggestions? Open a issue!)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)