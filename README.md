# LunaDB

LunaDB is my 3rd attempt in creating my own "database".
Please keep in mind that this is a early prototype.

1st attempt: [ShinoaDB](https://github.com/Hanyaku-Chan/ShinoaDB)
2nd attempt: [AnbuDB](https://github.com/Hanyaku-Chan/AnbuDB)

## Installation.

```bash
git clone https://github.com/Hanyaku-Chan/LunaDB
cd LunaDB

npm i
```

## Usage

To use LunaDB, you have to use the [LunaDB Client](https://github.com/Hanyaku-Chan/LunaDB-Client) for JavaScript or create your own Client.

```javascript
let LunaDB = require("lunadb-client");
let database1 = new LunaDB("Host", Port, "Login Name", "Login Password");
```

You can currently do:
- LunaDB.set(name, value)
- LunaDB.get(name)
- LunaDB.remove(name)
- LunaDB.createTable(name, value)


And you can manage users if you have access to the Administrator user:
- LunaDB.createUser(name, value)
- LunaDB.deleteUser(name, value)

The users created can be used to access the database. (What else should we use them for? Any suggestions? Open a issue!)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)