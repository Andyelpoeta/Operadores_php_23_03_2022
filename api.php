<?php
header('Access-Control-Allow-Origin: *');
header("Content-type: application/json;charset=utf-8");
$_DATA = (object) json_decode(file_get_contents("php://input"));
$_DATA->SERVER = (string) $_SERVER["HTTP_HOST"];
$_DATA->RES = (int) ($_DATA->OPERADOR == "and") 
? (
    ($_DATA->A and $_DATA->B) 
        ? 1 
        : 0
    ) 
: (
    ($_DATA->OPERADOR == "or")  
        ?(
            ($_DATA->A || $_DATA->B) 
            ? 1 
            : 0
        )
        : ""
);


echo(json_encode($_DATA, JSON_PRETTY_PRINT));


?>