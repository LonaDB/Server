<?php

return new class {
    public function run($LonaDB, $data, $client) : void {
        if (!$LonaDB->UserManager->CheckPermission($data['login']['name'], "table_create")) {
            $LonaDB->Logger->Error("User '".$data['login']['name']."' tried to create a table without permission");
            $response = json_encode(["success" => false, "err" => "no_permission", "process" => $data['process']]);
            socket_write($client, $response);
            socket_close($client);
            return;
        }

        if (empty($data['table']['name'])) {
            $response = json_encode(["success" => false, "err" => "bad_table_name", "process" => $data['process']]);
            socket_write($client, $response);
            socket_close($client);
            return;
        }

        if(str_starts_with($data['table']['name'], "system.") && $data['login']['name'] !== "root"){
            $response = json_encode(["success" => false, "err" => "not_root", "process" => $data['process']]);
            socket_write($client, $response);
            socket_close($client);
            return;
        }

        $table = $LonaDB->TableManager->CreateTable($data['table']['name'], $data['login']['name']);

        if(!$table){
            $response = json_encode(["success" => false, "err" => "table_exists", "process" => $data['process']]);
            socket_write($client, $response);
            socket_close($client);
            return;
        }

        $response = json_encode(["success" => true, "process" => $data['process']]);
        socket_write($client, $response);
        socket_close($client);

        //Run plugin event
        $LonaDB->PluginManager->RunEvent($data['login']['name'], "tableCreate", [ "name" => $data['table']['name'] ]);
    }
};
