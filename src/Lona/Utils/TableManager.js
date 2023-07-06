let fs = require("fs");
let BSON = require("bson");
let path = require("path");

let tables = {};

module.exports = class{
    constructor(lona){
        this.lona = lona;
        this.tables = tables;
        this._loaded = false;
    }

    loadTables = async () => {
        if(this._loaded === true) return {"success": false, "err": "alredy_loaded"};
        if (fs.readdirSync(__dirname + '/../Data/Tables/').length === 0) await fs.writeFileSync(__dirname + "/../Data/Tables/Default.bson", BSON.serialize({}));
        fs.readdirSync(__dirname + "/../Data/Tables/").forEach(function(file) {
            tables[path.parse(file).name] = BSON.deserialize(fs.readFileSync(__dirname + "/../Data/Tables/" + file));
            console.log("[Table] Loaded Table from file '" + path.parse(file).name + "'");
        });

        this._loaded = true;
        return {"success": true};
    }

    getTables = function () { 
        return Object.keys(this.tables); 
    }

    getFromTable = function (table, name) { 
        if(!name || !table) return {"success": false, "err": "arguments_invalid"};
        if(!this.tables[table]) return {"success": false, "err": "table_invalid"};
        return this.tables[table][name]; 
    }

    removeFromTable = async function (table, name) {
        if(!name || !table) return {"success": false, "err": "arguments_invalid"};
        if(!this.tables[table]) return {"success": false, "err": "table_invalid"};
        if(!this.tables[table][name]) return {"success": false, "err": "not_exist"};
        
        delete this.tables[table][name];
        fs.writeFileSync(__dirname + "/../Data/Tables/" + table + ".bson", BSON.serialize(this.tables[table + ".bson"]));
        return {"success": true};
    }

    insertToTable = async function (table, name, content) {
        if(!name || !table || !content) return {"success": false, "err": "arguments_invalid"};
        if(!this.tables[table]) return {"success": false, "err": "table_invalid"};
        if(this.tables[table][name]) return {"success": false, "err": "exist"};

        this.tables[table][name] = content;
        fs.writeFileSync(__dirname + "/../Data/Tables/" + table + ".bson", BSON.serialize(this.tables[table + ".bson"]));
        return {"success": true};
    }

    createTable = async function (name) {
        if(!name) return {"success": false, "err": "name_invalid"};
        if(this.tables[name]) return {"success": false, "err": "exists"};

        this.tables[name] = {};
        fs.writeFileSync(__dirname + "/../Data/Tables/" + name + ".bson", "{}");
        return {"success": true};
    }

    deleteTable = async function (name) {
        if(!name) return {"success": false, "err": "name_invalid"};
        if(!this.tables[name]) return {"success": false, "err": "not_exists"};

        delete this.tables[name];
        fs.unlink(__dirname + "/../Data/Tables/" + name + ".bson", (err) => {if (err) throw err;}); ;
        return {"success": true};
    }
}