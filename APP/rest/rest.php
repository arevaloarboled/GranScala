<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require_once 'db.php';
$app = new \Slim\App;
$app->post('/login', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("select idusuario,usuario,lvl_admin,habilitado,verificacion from usuarios where usuario='".$data["usuario"]."' and pass='".md5($data["pass"])."'");
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    //echo($rows);
    $rows=$rows[0];
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

$app->post('/edit_pais', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("update pais set nombre='".$data['nombre']."' where idpais=".$data['id']);
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

$app->post('/delete_pais', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("delete from pais where idpais=".$data['id']);
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

$app->post('/new_pais', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("INSERT INTO pais (nombre) VALUES ('".$data['nombre']."')");
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

$app->get('/get_all', function (Request $request, Response $response) {
    $bd=new DB();
    $ROWS = array();
    $rows = array();
    $result=$bd->query("select * from pais ORDER BY nombre");
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    $ROWS[]=$rows;
    $rows = array();
    $result=$bd->query("select * from Ciudad ORDER BY nombre");
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    $ROWS[]=$rows;
    //echo json_encode($rows);
    $response->withJson($ROWS);
    return $response;
});

$app->run();