<?php

return new class {
    public function run($lona, $data, $client) : void {
        if (!$lona->UserManager->CheckPermission($data['login']['name'], "table_delete")) {
            $lona->Logger->Error("User '".$data['login']['name']."' tried to delete a table without permission");
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

        if(!$lona->TableManager->GetTable($data['table']['name'])) {
            $response = json_encode(["success" => false, "err" => "table_missing", "process" => $data['process']]);
            socket_write($client, $response);
            socket_close($client);
            return;
        }

        if($lona->TableManager->GetTable($data['table']['name'])->GetOwner() !== $data['login']['name'] && $lona->UserManager->GetRole($data['login']['name']) !== "Administrator" && $lona->UserManager->GetRole($data['login']['name']) !== "Superuser") {
            $response = json_encode(["success" => false, "err" => "not_table_owner", "process" => $data['process']]);
            socket_write($client, $response);
            socket_close($client);
            return;
        }

        $table = $lona->TableManager->DeleteTable($data['table']['name'], $data['login']['name']);

        if(!$table){
            $response = json_encode(["success" => false, "err" => "table_doesnt_exist", "process" => $data['process']]);
            socket_write($client, $response);
            socket_close($client);
            return;
        }

        $response = json_encode(["success" => true, "process" => $data['process']]);
        socket_write($client, $response);
        socket_close($client);
    }
};
