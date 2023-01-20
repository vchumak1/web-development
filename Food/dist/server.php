<?php
//добавляем декодирование php для формата JSON
$_POST = json_decode(file_get_contents("php://input"), true);
//Эта строчка принимает данные на сервер с клиента в виде массива
echo var_dump($_POST);