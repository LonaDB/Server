<?php

return new class {
    public function run($lona, $data, $client) : void {
        if(!$data['permission'] || !$data['permission']['name'] || !$data['permission']['user']){
            $response = json_encode(["success" => false, "err" => "missing_arguments", "process" => $data['process']]);
            socket_write($client, $response);
            socket_close($client);
            return;
        }

        if(!$lona->UserManager->CheckPermission($data['login']['name'], "permission_check")) {
            $lona->Logger->Error("User '".$data['login']['name']."' tried to check a permission without permission");
            $response = json_encode(["success" => false, "err" => "no_permission", "process" => $data['process']]);
            socket_write($client, $response);
            socket_close($client);
            return;
        }

        $permission = $lona->UserManager->CheckPermission($data['permission']['user'], $data['permission']['name'], $data['login']['name']);

        $response = json_encode(["success" => true, "result" => $permission, "process" => $data['process']]);
        socket_write($client, $response);
        socket_close($client);
    }
};
