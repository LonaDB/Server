let Main = require("./src/Lona/Main");

let fs = require("fs");
const readline = require('readline');
let BSON = require("bson");

process.stdout.write('\033c');

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

async function checkDirs(){
    if (!fs.existsSync("./src/Lona/Data")){
        fs.mkdirSync("./src/Lona/Data");
    }
    if (!fs.existsSync("./src/Lona/Data/Tables")){
        fs.mkdirSync("./src/Lona/Data/Tables");
    }
}

async function checkConfig(){
    if (fs.existsSync("./config.json")) return;
    else {
        let port = await askQuestion("What port should LonaDB run on? \n");
        fs.writeFileSync("./config.json", JSON.stringify({"port": port}));
    }
}

async function checkUsers(){
    if (fs.existsSync("./src/Lona/Data/Users.bson")) return;
    else {
        let username = await askQuestion("What should be your initial username? \n");
        let password = await askQuestion("What should be your initial user password? \n");

        let usersJson = {};
        usersJson[username] =  {
            "password": password,
            "permissions": {
                "user_create": true,
                "user_delete": true,
                "table_create": true,
                "table_delete": true,
                "permission_add": true,
                "permission_remove": true
            }
        };


        fs.writeFileSync("./src/Lona/Data/Users.bson", BSON.serialize(usersJson));
    }
}

async function start() {

    await checkDirs();
    await checkConfig();
    await checkUsers();

    let config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
    let luna = new Main(config);
    console.log("\
[Note] Hadro is still in the beta.\n\
[Note] Hadro is LonaDB's server written in JavaScript\n\
    ");
    
    luna.start();

}

start();