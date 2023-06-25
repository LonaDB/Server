let net = require("net");
let BSON = require("bson");

module.exports = class{
    constructor(lona){
        this.lona = lona;
        this.socket = net.createServer(socket => {
            socket.on("data", dataString => {
                let data = BSON.deserialize(dataString);
    
                let login = this.lona.userManager.checkPassword(data.login.name, data.login.password);
                if(!login) return socket.write(BSON.serialize( {"success": false, "err": "login_error", "process": data.process} ));
    
                if(!data.process) return socket.write(BSON.serialize( {"success": false, "err": "bad_process_id", "process": data.process} ));
    
                switch(data.action){
                    case "set_variable":
                        if(!data.table.name) return socket.write(BSON.serialize( {"success": false, "err": "bad_table_name", "process": data.process} ));
                        if(!data.variable.name) return socket.write(BSON.serialize( {"success": false, "err": "bad_variable_name", "process": data.process} ));
                        if(!data.variable.value) return socket.write(BSON.serialize( {"success": false, "err": "bad_variable_value", "process": data.process} ));
    
                        this.lona.tableManager.insertToTable(data.table.name, data.variable.name, data.variable.value);
                        socket.write(BSON.serialize( {"success": true, "process": data.process} ));
                        break;
                    
                    case "get_variable":
                        if(!data.table.name) return socket.write(BSON.serialize( {"success": false, "err": "bad_table_name", "process": data.process} ));
                        if(!data.variable.name) return socket.write(BSON.serialize( {"success": false, "err": "bad_variable_name", "process": data.process} ));
    
                        let response = {
                            "variable": {
                                "name": "",
                                "value": ""
                            },
                            "success": false,
                            "process": data.process
                        }
    
                        response.variable.value = this.lona.tableManager.getFromTable(data.table.name, data.variable.name) || null;
                        response.variable.name = data.variable.name;
                        response.success = true;
    
                        socket.write(BSON.serialize(response));
                        break;
                    
                    case "remove_variable":
                        if(!data.table.name) return socket.write(BSON.serialize( {"success": false, "err": "bad_table_name", "process": data.process} ));
                        if(!data.variable.name) return socket.write(BSON.serialize( {"success": false, "err": "bad_variable_name", "process": data.process} ));

                        this.lona.tableManager.removeFromTable(data.table.name, data.variable.name);
                        socket.write(BSON.serialize( {"success": true, "process": data.process} ));
                        break;
                    
                    case "create_table":
                        if(!this.lona.userManager.checkPermission(data.login.name, "table_create")) return socket.write(BSON.serialize( {"success": false, "err": "no_permission", "process": data.process} ));
                        if(!data.table.name) return socket.write(BSON.serialize( {"success": false, "err": "bad_table_name", "process": data.process} ));
                        this.lona.tableManager.createTable(data.table.name);
                        socket.write(BSON.serialize( {"success": true, "process": data.process} ));
                        break;

                    case "delete_table":
                        if(!this.lona.userManager.checkPermission(data.login.name, "table_delete")) return socket.write(BSON.serialize( {"success": false, "err": "no_permission", "process": data.process} ));
                        if(!data.table.name) return socket.write(BSON.serialize( {"success": false, "err": "bad_table_name", "process": data.process} ));
                        this.lona.tableManager.deleteTable(data.table.name);
                        socket.write(BSON.serialize( {"success": true, "process": data.process} ));
                        break;
                    
                    case "create_user":
                        if(!this.lona.userManager.checkPermission(data.login.name, "user_create")) return socket.write(BSON.serialize( {"success": false, "err": "no_permission", "process": data.process} ));
                        if(!data.user.name || !data.user.password) return socket.write(BSON.serialize( {"success": false, "err": "missing_new_user_data", "process": data.process} ));

                        let createdUser = this.lona.userManager.createUser(data.user.name, data.user.password);
                        socket.write(BSON.serialize( {"success": true, "process": data.process} ));
                        break;

                    case "delete_user":
                        if(!this.lona.userManager.checkPermission(data.login.name, "user_delete")) return socket.write(BSON.serialize( {"success": false, "err": "no_permission", "process": data.process} ));
                        if(!data.user.name) return socket.write(BSON.serialize( {"success": false, "err": "missing_user_name", "process": data.process} ));

                        let deletedUser = this.lona.userManager.deleteUser(data.user.name);
                        socket.write(BSON.serialize(deletedUser));
                        break;

                    case "check_password":
                        if(!data.checkPass.name || !data.checkPass.pass) return socket.write(BSON.serialize( {"success": false, "err": "missing_arguments"} ));
                        let checkPass = this.lona.userManager.checkPassword(data.checkPass.name, data.checkPass.pass);

                        socket.write(BSON.serialize( {"success": true, "passCheck": checkPass, "process": data.process} ));
                        break;

                    case "get_tables":
                        let tables = this.lona.tableManager.getTables();
                        socket.write(BSON.serialize( {"success": true, "tables": tables, "process": data.process} ));
                        break;
                        
                    case "add_permission":
                        if(!this.lona.userManager.checkPermission(data.login.name, "permission_add")) return socket.write(BSON.serialize( {"success": false, "err": "no_permission", "process": data.process} ));
                        if(!data.user.name) return socket.write(BSON.serialize( {"success": false, "err": "missing_user_name", "process": data.process} ));

                        this.lona.userManager.addPermission(data.user.name, data.permission.name);
                        socket.write(BSON.serialize({"success": true, "process": data.process}));
                        break;

                    case "remove_permission":
                        if(!this.lona.userManager.checkPermission(data.login.name, "permission_remove")) return socket.write(BSON.serialize( {"success": false, "err": "no_permission", "process": data.process} ));
                        if(!data.user.name) return socket.write(BSON.serialize( {"success": false, "err": "missing_user_name", "process": data.process} ));

                        this.lona.userManager.removePermission(data.user.name, data.permission.name);
                        socket.write(BSON.serialize({"success": true, "process": data.process}));
                        break;
                }
            });
        });
    }

    startSocket = async function () {
        this.socket.listen(this.lona.config.port);
    }
}