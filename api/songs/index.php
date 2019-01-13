<?php
/**
 * Created by PhpStorm.
 * User: alex
 * Date: 1/13/19
 * Time: 9:52 PM
 */

$songs = file_get_contents('http://localhost:7000/api/songs');
header("Content-Type: application/json");

echo json_encode(json_decode($songs));