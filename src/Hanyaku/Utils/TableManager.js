let fs = require("fs");

let tables = {};

module.exports = class{
    constructor(luna){
        this.luna = luna;
        this.tables = tables;
        this._loaded = false;
    }

    loadTables = async () => {
        if(this._loaded === true) return {"success": false, "err": "alredy_loaded"};
        fs.readdirSync(__dirname + "/../Data/Tables/").forEach(function(file) {
            tables[file] = JSON.parse(fs.readFileSync(__dirname + "/../Data/Tables/" + file, "utf-8"));
            console.log("[Table] Loaded Table from file '" + file + "'");
        });

        this._loaded = true;
        return {"success": true};
    }

    getFromTable = function (table, name) { return this.tables[table + ".json"][name]; }

    insertToTable = async function (table, name, content) {
        if(!name || !table || !content) return {"success": false, "err": "arguments_invalid"};
        if(!this.tables[table + ".json"]) return {"success": false, "err": "table_invalid"};
        if(this.tables[table + ".json"][name]) return {"success": false, "err": "exist"};

        this.tables[table + ".json"][name] = content;
        fs.writeFileSync(__dirname + "/../Data/Tables/" + table + ".json", JSON.stringify(this.tables[table + ".json"]));
        return {"success": true};
    }

    createTable = async function (name) {
        if(!name) return {"success": false, "err": "name_invalid"};
        if(this.tables[name + ".json"]) return {"success": false, "err": "exists"};

        this.tables[name + ".json"] = {};
        fs.writeFileSync(__dirname + "/../Data/Tables/" + name + ".json", "{}");
        return {"success": true};
    }
}