let net = require("net");

function makeid(length){
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
    let counter = 0;
    while (counter < length){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        counter += 1;
    }
    return result;
}

let ca = class {
    constructor(host, port, name, password){
        this.name = name;
        this.password = password;
        this.port = port;
        this.host = host;

        this.data = {};
    }

    createTable = async function (name) {
        return new Promise(async (resolve, reject) => {
            let client = net.createConnection(this.port, this.host)
            let processID = makeid(5);

            await client.on("data", dataRaw => {
                let dataParse = JSON.parse(dataRaw.toString());
                if(dataParse.process === processID) resolve(dataParse);
            });
    
            await client.write(JSON.stringify({
                "action": "create_table",
                "table": {"name": name},
                "login": {
                    "name": this.name,
                    "password": this.password
                },
                "process": processID
            }));
        });
    }

    set = async function (table, name, value) {
        return new Promise(async (resolve, reject) => {
            let client = net.createConnection(this.port, this.host)
            let processID = makeid(5);

            await client.on("data", dataRaw => {
                let dataParse = JSON.parse(dataRaw.toString());
                if(dataParse.process === processID) resolve(dataParse);
            });
    
            await client.write(JSON.stringify({
                "action": "set_variable",
                "table": {"name": table},
                "variable": {
                    "name": name,
                    "value": value
                },
                "login": {
                    "name": this.name,
                    "password": this.password
                },
                "process": processID
            }));
        });
    }

    get = async function (table, name) {
        return new Promise(async (resolve, reject) => {
            let client = net.createConnection(this.port, this.host)
            let processID = makeid(5);

            await client.on("data", dataRaw => {
                let dataParse = JSON.parse(dataRaw.toString());
                
                if(dataParse.process === processID && dataParse.err) resolve ({"err": dataParse.err});
                if(dataParse.process === processID) resolve(dataParse.variable.value);
            });
    
            await client.write(JSON.stringify({
                "action": "get_variable",
                "table": {"name": table},
                "variable": {
                    "name": name,
                },
                "login": {
                    "name": this.name,
                    "password": this.password
                },
                "process": processID
            }));
        });
    }
}

let aa = new ca("localhost", 2000, "Hanyaku", "password");
async function u (table) {console.log(await aa.createTable(table))}

u("Default3")