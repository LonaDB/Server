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

        this.users[name] = {
            "password": password,
            "permissions": {
                "user_create": false,
                "user_delete": false,
                "table_create": false,
                "table_delete": false,
                "permission_add": false,
                "permission_remove": false
            }
        };
        fs.writeFileSync(__dirname + "/../Data/Users.bson", BSON.serialize(this.users));
        return {"success": true};
    }

    deleteUser = async function (name) {
        if(!name) return {"success": false, "err": "username_missing"};
        if(!this.users[name]) return {"success": false, "err": "user_missing"};

        delete this.users[name];
        fs.writeFileSync(__dirname + "/../Data/Users.bson", BSON.serialize(this.users));
        return {"success": true};
    }

    checkPassword = async function (name, password) {
        if(!name || !password) return {"success": false, "err": "arguments_invalid"};

        if(name === "Administrator") {
            if(password !== this.lona.config.admin_password) return {"success": false, "err": "wrong_password"};
            return {"success": true};
        }
        
        if(!this.users[name]) return {"success": false, "err": "user_doesnt_exist"};

        if(this.users[name].password !== password) return {"success": false, "err": "wrong_password"};

        return {"success": true};
    }

    checkPermission = function (name, permission) {
        if(!name || !permission) return {"success": false, "err": "arguments_invalid"};

        if(!this.users[name]) return {"success": false, "err": "user_doesnt_exist"};

        if(!this.users[name].permissions[permission]) return false;

        return this.users[name].permissions[permission]
    }

    addPermission = async function (name, permission) {
        if(!name || !permission) return {"success": false, "err": "arguments_invalid"};

        if(!this.users[name]) return {"success": false, "err": "user_doesnt_exist"};

        console.log(this.users)
        this.users[name].permissions[permission] = true;
        fs.writeFileSync(__dirname + "/../Data/Users.bson", BSON.serialize(this.users));

        return {"success": true};
    }

    removePermission = async function (name, permission) {
        if(!name || !permission) return {"success": false, "err": "arguments_invalid"};

        if(!this.users[name]) return {"success": false, "err": "user_doesnt_exist"};

        if(!this.users[name].permissions[permission]) return {"success": true, "err": "missing_permission"};

        delete this.users[name].permissions[permission];
        fs.writeFileSync(__dirname + "/../Data/Users.bson", BSON.serialize(this.users));

        return {"success": true};
    }
}