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

$app->post('/new_ciudad', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("INSERT INTO Ciudad (nombre,pais_idpais) VALUES ('".$data['nombre']."',".$data['pais'].")");
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

$app->post('/delete_ciudad', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("delete from Ciudad where idCiudad=".$data['id']);
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

$app->post('/edit_ciudad', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("update Ciudad set nombre='".$data['nombre']."', pais_idpais=".$data['pais']." where idCiudad=".$data['id']);
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

$app->post('/edit_marca', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("update supermercado set nombre='".$data['nombre']."' where idsupermercado=".$data['id']);
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

$app->post('/delete_marca', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("delete from supermercado where idsupermercado=".$data['id']);
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

$app->post('/new_marca', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("INSERT INTO supermercado (nombre) VALUES ('".$data['nombre']."')");
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

$app->post('/edit_local', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("update local set nombre='".$data['nombre']."', direccion='".$data['direccion']."', habilitado=".$data['habilitado'].", supermercado_idsupermercado=".$data['marca'].", Ciudad_idCiudad=".$data['ciudad']." where idlocal=".$data['id']);
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

$app->post('/delete_local', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("delete from local where idlocal=".$data['id']);
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

$app->post('/new_local', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("INSERT INTO local (nombre,direccion,habilitado,supermercado_idsupermercado,Ciudad_idCiudad) VALUES ('".$data['nombre']."','".$data['direccion']."',".$data['habilitado'].",".$data['marca'].",".$data['ciudad'].")");
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

$app->get('/get_all_admin', function (Request $request, Response $response) {
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
    $rows = array();
    $result=$bd->query("select * from supermercado ORDER BY nombre");
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    $ROWS[]=$rows;
    $rows = array();
    $result=$bd->query("select * from local ORDER BY nombre");
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    $ROWS[]=$rows;
    //echo json_encode($rows);
    $response->withJson($ROWS);
    return $response;
});

$app->post('/new_usuario', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("INSERT INTO usuarios (usuario,pass,nombre,apellido,verificacion,habilitado,nacimiento,universidad,carrera,correo,celular,lvl_admin,bonos,certificado,Ciudad_idCiudad) VALUES ( '".$data["usuario"]."','".md5($data["pass"])."','".$data["nombre"]."','".$data["apellido"]."',0,1,'".$data["nacimiento"]."','".$data["universidad"]."','".$data["carrera"]."','".$data["correo"]."',".$data["numero"].",0,0,'certificado',".$data["ciudad"].")");
    //echo($data);
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

//update de info de usuario
$app->post('/update_usuario', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("UPDATE usuarios SET nombre='".$data["nombre"]."',apellido='".$data["apellido"]."',universidad='".$data["universidad"]."',carrera='".$data["carrera"]."',correo='".$data["correo"]."',celular=".$data["numero"].",Ciudad_idCiudad=".$data["ciudad"]." where idusuario=".$data["id"]);
    //echo($data);
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

$app->post('/update_pass', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("UPDATE usuarios SET pass='".md5($data["pass"])."' where idusuario=".$data["id"]);
    //echo($data);
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});
//Update para actualizar la verificación , habilitado , level admin , local y bonus
$app->post('/update_admin', function (Request $request, Response $response) {
    //$name = $request->getAttribute('name');
    $data = $request->getParsedBody();
    //echo($data);
    $bd=new DB();
    $rows = array();
    $result=$bd->query("UPDATE usuarios SET verificacion=".$data["verificacion"].",habilitado=".$data["habilitado"].",lvl_admin=".$data["lvl_admin"].",bonos=".$data["bonos"].",local_idlocal=".$data["local"]." where idusuario=".$data["id"]);
    //echo($data);
    //$response->getBody()->write("Hello, $name");
    //print_r($result);
    //echo($rows);
    $rows="ok";
    //echo json_encode($rows);
    $response->withJson($rows);
    return $response;
});

//trae todos los usuarios
$app->get('/get_usuarios', function (Request $request, Response $response) {
    $bd=new DB();
    $ROWS = array();
    $rows = array();
    $result=$bd->query("select * from usuarios ORDER BY usuario");
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    $ROWS[]=$rows;
    //echo json_encode($rows);
    $response->withJson($ROWS);
    return $response;
});
//Trae un usuario dado su id -  HAX
$app->get('/get_usuario/{id}', function (Request $request, Response $response) {
    $data = $request->getAttribute('id');
    $bd=new DB();
    $ROWS = array();
    $rows = array();
    $result=$bd->query("select * from usuarios where idusuario=".$data);
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    $ROWS[]=$rows;
    //echo json_encode($rows);
    $response->withJson($ROWS);
    return $response;
});

$app->get('/get_usuarios', function (Request $request, Response $response) {
    $bd=new DB();
    $ROWS = array();
    $rows = array();
    $result=$bd->query("select * from usuarios ORDER BY usuario");
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    $ROWS[]=$rows;
    //echo json_encode($rows);
    $response->withJson($ROWS);
    return $response;
});



/*
$app->post('/upload', function ($request, $response, $args) {
    $files = $request->getUploadedFiles();
    if (empty($files['newfile'])) {
        throw new Exception('Expected a newfile');
    }
 
    $newfile = $files['newfile'];
    // do something with $newfile
});*/

$app->post('/signin', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $files = $request->getUploadedFiles();
    $files = $request->getUploadedFiles();
    
    $newfile = $files['file'];
    
    $bd=new DB();
    $ROWS[]=$rows;
    $rows = array();
    $result=$bd->query("INSERT INTO usuarios (usuario,pass,nombre,apellido,verificacion,habilitado,nacimiento,universidad,carrera,correo,celular,lvl_admin,bonos,certificado,Ciudad_idCiudad,local_idlocal) VALUES ( '".$data.['usuario']."','".md5($data["pass"])."','".$data["nombre"]."','".$data["appellido"]."','0','1','".$data["fecha"]."','".$data["universidad"]."','".$data["carrera"]."','".$data["correo"]."','".$data["celular"]."','0','0','certificado.jpg','".$data["ciudad"]."')");
    $result=$bd->query("select * from usuarios where usuario=".$data['usuario']);
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    $uploadFileName = split(".",$newfile->getClientFilename());
    $newfile->moveTo("../EPE/certificados/".$rows['idusuario'].$uploadFileName[-1]);
    //echo json_encode($rows);
    $ROWS="ok";
    $response->withJson($ROWS);
    return $response;
});



$app->post('/ver_user', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $bd=new DB();
    $ROWS[]=$rows;
    $rows = array();                                                                                                                                                                                                                                                                                                                                
    $result=$bd->query("select count(*) as num from usuarios where usuario='".$data['user']."'");
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    $ROWS[]=$rows;
    //echo json_encode($rows);
    $response->withJson($ROWS);
    return $response;
});


$app->run();