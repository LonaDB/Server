let fs = require("fs");
let BSON = require("bson");

let tables = {};

module.exports = class{
    constructor(lona){
        this.lona = lona;
        this.tables = tables;
        this._loaded = false;
    }

    loadTables = async () => {
        if(this._loaded === true) return {"success": false, "err": "alredy_loaded"};
        fs.readdirSync(__dirname + "/../Data/Tables/").forEach(function(file) {
            tables[file] = BSON.deserialize(fs.readFileSync(__dirname + "/../Data/Tables/" + file));
            console.log("[Table] Loaded Table from file '" + file + "'");
        });

        this._loaded = true;
        return {"success": true};
    }

    getFromTable = function (table, name) { 
        if(!name || !table) return {"success": false, "err": "arguments_invalid"};
        if(!this.tables[table + ".bson"]) return {"success": false, "err": "table_invalid"};
        return this.tables[table + ".bson"][name]; 
    }

    removeFromTable = async function (table, name) {
        if(!name || !table) return {"success": false, "err": "arguments_invalid"};
        if(!this.tables[table + ".bson"]) return {"success": false, "err": "table_invalid"};
        if(!this.tables[table + ".bson"][name]) return {"success": false, "err": "not_exist"};
        
        delete this.tables[table + ".bson"][name];
        fs.writeFileSync(__dirname + "/../Data/Tables/" + table + ".bson", BSON.serialize(this.tables[table + ".bson"]));
        return {"success": true};
    }

    insertToTable = async function (table, name, content) {
        if(!name || !table || !content) return {"success": false, "err": "arguments_invalid"};
        if(!this.tables[table + ".bson"]) return {"success": false, "err": "table_invalid"};
        if(this.tables[table + ".bson"][name]) return {"success": false, "err": "exist"};

        this.tables[table + ".bson"][name] = content;
        fs.writeFileSync(__dirname + "/../Data/Tables/" + table + ".bson", BSON.serialize(this.tables[table + ".bson"]));
        return {"success": true};
    }

    createTable = async function (name) {
        if(!name) return {"success": false, "err": "name_invalid"};
        if(this.tables[name + ".bson"]) return {"success": false, "err": "exists"};

        this.tables[name + ".bson"] = {};
        fs.writeFileSync(__dirname + "/../Data/Tables/" + name + ".bson", "{}");
        return {"success": true};
    }
}