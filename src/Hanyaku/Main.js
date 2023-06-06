let TableManager = require(__dirname + "/Utils/TableManager");
let UserManager = require(__dirname + "/Utils/UserManager");
let NetworkManager = require(__dirname + "/Utils/NetworkManager");

module.exports = class{
    constructor(config){
        this.version = "3.1.5";

        this.config = config;
        
        this.tableManager = new TableManager(this);
        this.userManager = new UserManager(this);
        this.networkManager = new NetworkManager(this);
    }

    start = async () =>{
        this.tableManager.loadTables();
        this.userManager.loadUsers();
        this.networkManager.startSocket();
    }
}