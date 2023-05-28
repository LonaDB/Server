let Collection = require("json-collection");
let  AES = require("crypto-js/aes");

module.exports = class{
    constructor(luna){
        this.luna = luna;
        this.users = new Collection();
        this._loaded = false;
    }

    loadUsers = async () => {
        if(this._loaded === true) return {"success": false, "err": "alredy_loaded"};

        this.users.load(__dirname + "/../Data/Users.json");
        console.log("[Users] Users have been loaded.");

        this._loaded = true;
        return {"success": true};
    }

    createUser = async function (name, password) {
        if(!name || !password) return {"success": false, "err": "arguments_invalid"};
        if(this.users.get(name)) return {"success": false, "err": "user_exists"};

        this.users.set(name, password);
        this.users.save(__dirname + "/../Data/Users.json");
        return {"success": true};
    }

    checkPassword = async function (name, password) {
        if(!name || !password) return {"success": false, "err": "arguments_invalid"};
        if(!this.users.get(name)) return {"success": false, "err": "user_doesnt_exist"};

        if(this.users.get(name) !== password) return {"success": false, "err": "wrong_password"};

        return {"success": true};
    }
}