let BSON = require("bson");
let fs = require("fs");

module.exports = class{
    constructor(lona){
        this.lona = lona;
        this.users = {};
        this._loaded = false;
    }

    loadUsers = async () => {
        if(this._loaded === true) return {"success": false, "err": "alredy_loaded"};

        this.users = BSON.deserialize(fs.readFileSync(__dirname + "/../Data/Users.bson"));
        console.log("[Users] Users have been loaded.");

        this._loaded = true;
        return {"success": true};
    }

    createUser = async function (name, password) {
        if(!name || !password) return {"success": false, "err": "arguments_invalid"};
        if(this.users[name]) return {"success": false, "err": "user_exists"};

        this.users[name] = password;
        fs.writeFileSync(__dirname + "/../Data/Users.bson", BSON.serialize(this.users));
        return {"success": true};
    }

    deleteUser = async function (name) {
        if(!name) return {"success": false, "err": "username_missing"};
        if(!this.users[name]) return {"success": false, "err": "user_missing"};

        delete this.users[name];
        this.users.save(__dirname + "/../Data/Users.bson");
        return {"success": true};
    }

    checkPassword = async function (name, password) {
        if(!name || !password) return {"success": false, "err": "arguments_invalid"};

        if(name === "Administrator" || name === "administrator" || name === "admin" || name === "Admin") {
            if(password !== this.lona.config.admin_password) return {"success": false, "err": "wrong_password"};
            return {"success": true};
        }
        
        if(!this.users[name]) return {"success": false, "err": "user_doesnt_exist"};

        if(this.users[name] !== password) return {"success": false, "err": "wrong_password"};

        return {"success": true};
    }
}