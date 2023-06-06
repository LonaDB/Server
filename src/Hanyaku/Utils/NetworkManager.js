let net = require("net");

module.exports = class{
    constructor(luna){
        this.luna = luna;
        this.socket = net.createServer(socket => {
            socket.on("data", dataString => {
                let data = JSON.parse(dataString);
    
                let login = this.luna.userManager.checkPassword(data.login.name, data.login.password);
                if(!login) return socket.write(JSON.stringify( {"success": false, "err": "login_error", "process": data.process} ));
    
                if(!data.process) return socket.write(JSON.stringify( {"success": false, "err": "bad_process_id", "process": data.process} ));
    
                console.log(data)
    
                switch(data.action){
                    case "set_variable":
                        if(!data.table.name) return socket.write(JSON.stringify( {"success": false, "err": "bad_table_name", "process": data.process} ));
                        if(!data.variable.name) return socket.write(JSON.stringify( {"success": false, "err": "bad_variable_name", "process": data.process} ));
                        if(!data.variable.value) return socket.write(JSON.stringify( {"success": false, "err": "bad_variable_value", "process": data.process} ));
    
                        this.luna.tableManager.insertToTable(data.table.name, data.variable.name, data.variable.value);
                        socket.write(JSON.stringify( {"success": true, "process": data.process} ));
                        break;
                    
                    case "get_variable":
                        if(!data.table.name) return socket.write(JSON.stringify( {"success": false, "err": "bad_table_name", "process": data.process} ));
                        if(!data.variable.name) return socket.write(JSON.stringify( {"success": false, "err": "bad_variable_name", "process": data.process} ));
    
                        let response = {
                            "variable": {
                                "name": "",
                                "value": ""
                            },
                            "success": false,
                            "process": data.process
                        }
    
                        response.variable.value = this.luna.tableManager.getFromTable(data.table.name, data.variable.name) || null;
                        response.variable.name = data.variable.name;
                        response.success = true;
    
                        socket.write(JSON.stringify(response));
                        break;
                    
                    case "remove_variable":
                        if(!data.table.name) return socket.write(JSON.stringify( {"success": false, "err": "bad_table_name", "process": data.process} ));
                        if(!data.variable.name) return socket.write(JSON.stringify( {"success": false, "err": "bad_variable_name", "process": data.process} ));

                        this.luna.tableManager.removeFromTable(data.table.name, data.variable.name);
                        socket.write(JSON.stringify( {"success": true, "process": data.process} ));
                        break;
                    
                    case "create_table":
                        if(!data.table.name) return socket.write(JSON.stringify( {"success": false, "err": "bad_table_name", "process": data.process} ));
                        this.luna.tableManager.createTable(data.table.name);
                        socket.write(JSON.stringify( {"success": true, "process": data.process} ));
                        break;
                    
                    case "create_user":
                        if(data.login.name !== "Administrator") return socket.write(JSON.stringify( {"success": false, "err": "user_not_admin", "process": data.process} ));
                        if(!data.user.name || !data.user.password) return socket.write(JSON.stringify( {"success": false, "err": "missing_new_user_data", "process": data.process} ));

                        let createdUser = this.luna.userManager.createUser(data.user.name, data.user.password);
                        socket.write(JSON.stringify(createdUser));
                        break;

                    case "delete_user":
                        if(data.login.name !== "Administrator") return socket.write(JSON.stringify( {"success": false, "err": "user_not_admin", "process": data.process} ));
                        if(!data.user.name) return socket.write(JSON.stringify( {"success": false, "err": "missing_user_name", "process": data.process} ));

                        let deletedUser = this.luna.userManager.deleteUser(data.user.name);
                        socket.write(JSON.stringify(deletedUser));
                        break;
                }
            });
        });
    }

    startSocket = async function () {
        this.socket.listen(this.luna.config.port);
    }
}