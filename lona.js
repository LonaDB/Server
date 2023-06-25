let Main = require("./src/Hanyaku/Main");

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
    if (!fs.existsSync("./src/Hanyaku/Data")){
        fs.mkdirSync("./src/Hanyaku/Data");
    }
    if (!fs.existsSync("./src/Hanyaku/Data/Tables")){
        fs.mkdirSync("./src/Hanyaku/Data/Tables");
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
    if (fs.existsSync("./src/Hanyaku/Data/Users.bson")) return;
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


        fs.writeFileSync("./src/Hanyaku/Data/Users.bson", BSON.serialize(usersJson));
    }
}

async function start() {

    await checkDirs();
    await checkConfig();
    await checkUsers();

    let config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
    let luna = new Main(config);
    console.log("\
[Note] LonaDB is still in the beta.\n\
[Note] Older beta versions can be found on https://github.com/Hanyaku/\n\
[Note] V1: ShinoaDB\n\
[Note] V2: AnbuDB\n\
[Note] V3: LonaDB <3\
    ");
    
    luna.start();

}

start();