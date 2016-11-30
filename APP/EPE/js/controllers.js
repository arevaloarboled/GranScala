var epeControllers = angular.module('webApp')
    .controller('MainCtrl', [
      '$scope',
      '$q',
      '$mdPanel',
      '$mdMedia',
      'LinksService',
      'PollingService',
      'httpFilter','ngMaterial', 'ngMessages', 'material.svgAssetsCache','$mdToast','$mdSidenav']);
      
function actualizar_scope(){
      $scope.id=getCookie("id");
      $scope.user=getCookie("user");
      $scope.lvl=getCookie("lvl");
    };
function add_edit_array(item){
  item.edit=false;
};
    
/*      
$scope.getPanelConfig = function() {
      var position = $scope._mdPanel.newPanelPosition()
        .absolute()
        .center();
      var config = {
        attachTo: angular.element(document.body),
        controller: AddLinkDialogCtrl,
        controllerAs: 'ctrl',
        disableParentScroll: true,
        templateUrl: 'views/panel.tmpl.html',
        hasBackdrop: true,
        panelClass: 'demo-dialog-example',
        position: position,
        trapFocus: true,
        zIndex: 150,
        clickOutsideToClose: true,
        escapeToClose: true,
        focusOnOpen: true,
        locals: {
          'type': 'new',
          'id': 0,
          'title':'',
          'url': '',
          'tags': ''
        }
      };
      return config;
    };

  $scope.newLink = function() {
      PollingService.cancelNextLoad();
      var config = $scope.getPanelConfig();
      $scope._mdPanel.open(config);
    };

    $scope.editLink = function(id) {
      PollingService.cancelNextLoad();
      var edit = LinksService.getLinkById(id);
      var config = $scope.getPanelConfig();
      config["locals"] = {
        'type': 'edit',
        'id': id,  
        'title': edit.title,
        'url': httpFilter(edit.url),
        'tags': edit.tags
      }
      $scope._mdPanel.open(config);
    };
*/    
epeControllers.controller('LogIn', ['$scope', '$http','$window','$mdDialog',
  function ($scope, $http,$window,$mdDialog) {
      if(getCookie("id")!=undefined){
          $window.location.href = $window.location.pathname+'#/principal';
		  $window.reload;
      }
      $scope.send = function () {
          $http.post('../rest/rest.php/login', {
              usuario : $scope.usuario,
              pass : $scope.pass
		}).then(function (data) {
		    data=data['data'];
		    console.log(data);
		    if(data=="null"){
  		      $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Error en inicio de session')
              .textContent('usuario o contraseña invalida, intente de nuevo')
              .ariaLabel('Alert Dialog Demo')
              .ok('Entiendo')
            );
		    }
		    else{
		        if(data['verificacion']==0){
		            $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Error en inicio de session')
                  .textContent('el usuario no ha sido verificado, contacte a un administrador')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('Entiendo')
                );
		            return;
		        }
		        if(data['habilitado']==0){
		            $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Error en inicio de session')
                  .textContent('el usuario esta inhabilitado, contacte a un administrador')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('Entiendo')
                );
		            return;
		        }
		        setCookie("id",data['idusuario']);
		        setCookie("user",data['usuario']);
		        setCookie("lvl",data['lvl_admin']);
		        $window.location.href = $window.location.pathname;
		        $window.reload;
		    }
			//console.log(data);
            //do something with data
            
		},(function (data) {
			console.log(data,'Error contacte el administrador');
		}));
      }
  }]);
  
  epeControllers.controller('signin', ['$scope', '$http','$window','$mdDialog',
  function ($scope, $http,$window,$mdDialog) {
      if(getCookie("id")!=undefined){
          $window.location.href = $window.location.pathname+'#/principal';
		  $window.reload;
      }
      
      $scope.paises = [];
      $scope.ciudades = [];
      
      $scope.search = function() {
          $http.get('../rest/rest.php/get_all_admin').then(function(data) {
		        data = data['data'];
		        $scope.paises=data[0];
		        $scope.ciudades=data[1];
          },(function (data) {
              console.log('error');
          }));
      };
      
      $scope.send = function () {
          $http.post('../rest/rest.php/new_usuario', {
              usuario : $scope.usuario,
              pass : $scope.pass,
              nombre: $scope.nombre,
              apellido: $scope.appellido,
              nacimiento: $scope.fecha,
              universidad: $scope.universidad,
              carrera: $scope.carrera,
              correo: $scope.correo,
              numero: $scope.numero,
              ciudad: $scope.ciudad
		      }).then(function (data) {
		        console.log(data);
		        //data = data['data'];
		        //$window.location.href = $window.location.pathname;
		        //$window.location.href = $window.location.pathname+'#/verify/'+data['id'];
		        //$window.reload;
		      },(function (data) {
			      console.log(data,'Error contacte el administrador');
		      }));
		      $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Envío realizado')
            .textContent('Espere la verificación de un administrador.')
            .ariaLabel('Alert Dialog Demo')
            .ok('Entiendo')
          );
		      $window.location.href = $window.location.pathname;
	        $window.reload;
      }
      
      $scope.ver_user = function () {
          $http.post('../rest/rest.php/ver_user', {
              user : $scope.usuario
		      }).then(function (data) {
		        data = data['data'];
		        if(data[1][0]['num']==0){
		          $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Verificacion de usuario')
                .textContent('¡Usuario disponible!')
                .ariaLabel('Alert Dialog Demo')
                .ok('Entiendo')
              );
		        }
		        else{
		          $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Verificacion de usuario')
                .textContent('Usuario no disponible..')
                .ariaLabel('Alert Dialog Demo')
                .ok('Entiendo')
              );
		        }
		      },(function (data) {
			      console.log(data,'Error contacte el administrador');
		      }));
      }
      $scope.search();
  }]);
  
  epeControllers.controller('perfil', ['$scope', '$http','$window','$mdDialog',
  function ($scope, $http,$window,$mdDialog) {
      
      $scope.paises = [];
      $scope.ciudades = [];
      $scope.perfil = [];
      $scope.nombre="";
      $scope.appellido="";
      $scope.universidad="";
      $scope.carrera="";
      $scope.correo="";
      $scope.numero="";
      $scope.ciudad="";
      
      $scope.cambiar=function(){
        var confirm = $mdDialog.prompt()
        .title('Nueva contraseña')
        .placeholder('Contraseña')
        .ok('Guardar')
        .cancel('Cancelar');
  
      $mdDialog.show(confirm).then(function(result) {
        $http.post('../rest/rest.php/update_pass', {
              id: getCookie("id"),
              pass: result
		    }).then(function(data) {
		      /*if(data['data']!='"ok"'){
		        $mdToast.show(
              $mdToast.simple()
                .textContent('La operación ha fallado...')
                .hideDelay(3000)
            );    
            return;
		      }*/
		    });
		    $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Envío realizado')
            .textContent('Contraseña actualizada')
            .ariaLabel('Alert Dialog Demo')
            .ok('Entiendo')
          );
      });
      };
      
      $scope.search = function() {
          $http.get('../rest/rest.php/get_all_admin').then(function(data) {
		        data = data['data'];
		        $scope.paises=data[0];
		        $scope.ciudades=data[1];
          },(function (data) {
              console.log('error');
          }));
          
          $http.get('../rest/rest.php/get_usuario/'+getCookie("id")).then(function(data) {
		        data = data['data'];
		        $scope.perfil=data[0][0];
		        $scope.nombre=$scope.perfil["nombre"];
            $scope.appellido=$scope.perfil["apellido"];
            $scope.universidad=$scope.perfil["universidad"];
            $scope.carrera=$scope.perfil["carrera"];
            $scope.correo=$scope.perfil["correo"];
            $scope.numero=$scope.perfil["celular"];
            $scope.ciudad=$scope.perfil["Ciudad_idCiudad"];
          },(function (data) {
              console.log('error');
          }));
          
      };
      
      $scope.send = function () {
          $http.post('../rest/rest.php/update_usuario', {
              id: getCookie("id"),
              nombre: $scope.nombre,
              apellido: $scope.appellido,
              universidad: $scope.universidad,
              carrera: $scope.carrera,
              correo: $scope.correo,
              numero: $scope.numero,
              ciudad: $scope.ciudad
		      }).then(function (data) {
		        console.log(data);
		        //data = data['data'];
		        //$window.location.href = $window.location.pathname;
		        //$window.location.href = $window.location.pathname+'#/verify/'+data['id'];
		        //$window.reload;
		      },(function (data) {
			      console.log(data,'Error contacte el administrador');
		      }));
		      $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Envío realizado')
            .textContent('Informacion actualizada')
            .ariaLabel('Alert Dialog Demo')
            .ok('Entiendo')
          );
      }
      
      $scope.search();
  }]);
  
  epeControllers.controller('verify', ['$scope', '$http','$window','$mdDialog',
  function ($scope, $http,$window,$mdDialog) {
      $scope.send = function () {
            $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Envio realizado')
                  .textContent('Espere la verificacion de un administrador.')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('Entiendo')
                );
		        $window.location.href = $window.location.pathname;
		        $window.reload;
      }
  }]);
  
  epeControllers.controller('principal', ['$scope', '$http','$window','$mdDialog',
  function ($scope, $http,$window) {
      if(getCookie("id")==undefined){
          $window.location.href = $window.location.pathname;
		  $window.reload;
      }
  }]);
  
  epeControllers.controller('turnos', ['$scope', '$http','$window','$mdDialog','$mdToast','$mdSidenav',
  function ($scope, $http,$window,$mdDialog,$mdToast,$mdSidenav) {
      if(getCookie("id")==undefined){
          $window.location.href = $window.location.pathname;
		  $window.reload;
      };
      $scope.marcas=[];
      $scope.locales_user=[];
      $scope.turnos=[];
      
      $scope.buscar=function(obj,element,value){
        for(var i in obj){
          //console.log(obj[i]);
          //console.log(obj[i][element]);
          if (obj[i][element]==value){
            return obj[i];
          }
        }
        return null;
      };
      
      $scope.search = function() {
          $http.get('../rest/rest.php/get_locales_user/'+getCookie("id")).then(function(data) {
		        data = data['data'];
		        $scope.marcas=data[0];
		        $scope.locales_user=data[1];
		        console.log(data);
          },(function (data) {
              console.log('error');
          }));
          $http.get('../rest/rest.php/get_turnos_user/'+getCookie("id")).then(function(data) {
		        data = data['data'];
		        $scope.turnos=data[0];
		        console.log(data);
          },(function (data) {
              console.log('error');
          }));
      };
      
      $scope.search();
  }]);
  



  epeControllers.controller('usuarios', ['$scope', '$http','$window','$mdDialog','$mdToast','$mdSidenav',
  function ($scope, $http,$window,$mdDialog,$mdToast,$mdSidenav) {
      
      $scope.buscar=function(obj,element,value){
        for(var i in obj){
          //console.log(obj[i]);
          //console.log(obj[i][element]);
          if (obj[i][element]==value){
            return obj[i];
          }
        }
        return null;
      };
      
      $scope.locales=[];
      
      $scope.search = function() {
          $http.get('../rest/rest.php/get_usuarios').then(function(data) {
		        data = data['data'];
		        $scope.usuarios = data[0];
		        $scope.usuarios.forEach(add_edit_array);
		        //$scope.locales_user = data[1];
          },(function (data) {
              console.log('error');
          }));
          $http.get('../rest/rest.php/get_all_admin').then(function(data) {
		        data = data['data'];
		        $scope.locales = data[3];
		        //$scope.locales_user = data[1];
          },(function (data) {
              console.log('error');
          }));
      };
      
      $scope.search();
      
      $scope.edit_usuario=function(usuario){
        $http.post('../rest/rest.php/update_admin', {
              id:usuario.idusuario,
              bonos:usuario.bonos,
              lvl_admin:usuario.lvl_admin,
              local:usuario.local_idlocal,
              verificacion:usuario.verificacion,
              habilitado:usuario.habilitado
		    }).then(function(data) {
		      console.log(data);
		      if(data['data']!='"ok"'){
		        $mdToast.show(
              $mdToast.simple()
                .textContent('La operación ha fallado...')
                .hideDelay(3000)
            );    
            return;
		      }
		    });
		    usuario.edit=false;
		    $mdToast.show(
          $mdToast.simple()
            .textContent('¡Usuario actualizado!')
            .hideDelay(3000)
        );
      };
      
      
      
  }]);
  
  

  epeControllers.controller('administrar', ['$scope', '$http','$window','$mdDialog','$mdToast','$mdSidenav',
  function ($scope, $http,$window,$mdDialog,$mdToast,$mdSidenav) {
      if(getCookie("id")==undefined){
          $window.location.href = $window.location.pathname;
		  $window.reload;
      };
      
      $scope.paises = [];
      $scope.ciudades = [];
      $scope.marcas=[];
      $scope.locales=[];
      
      $scope.buscar=function(obj,element,value){
        for(var i in obj){
          //console.log(obj[i]);
          //console.log(obj[i][element]);
          if (obj[i][element]==value){
            return obj[i];
          }
        }
        return null;
      };
      
      $scope.search = function() {
          $http.get('../rest/rest.php/get_all_admin').then(function(data) {
		        data = data['data'];
		        $scope.paises=data[0];
		        $scope.ciudades=data[1];
		        $scope.marcas=data[2];
		        $scope.locales=data[3];
		        $scope.paises.forEach(add_edit_array);
		        $scope.ciudades.forEach(add_edit_array);
		        $scope.marcas.forEach(add_edit_array);
		        $scope.locales.forEach(add_edit_array);
          },(function (data) {
              console.log('error');
          }));
      };
      
      $scope.edit_pais=function(pais){
        var confirm = $mdDialog.prompt()
        .title('Nombre pais')
        .placeholder('Pais')
        .initialValue(pais.nombre)
        .ok('Guardar')
        .cancel('Cancelar');
  
      $mdDialog.show(confirm).then(function(result) {
        $http.post('../rest/rest.php/edit_pais', {
              id: pais.idpais,
              nombre : result
		    }).then(function(data) {
		      if(data['data']!='"ok"'){
		        $mdToast.show(
              $mdToast.simple()
                .textContent('La operación ha fallado...')
                .hideDelay(3000)
            );    
            return;
		      }
		    });
		    pais.nombre=result;
		    $mdToast.show(
          $mdToast.simple()
            .textContent('Pais actualizado!')
            .hideDelay(3000)
        );
      });
      };
      
      $scope.delete_pais=function(pais){
        var confirm = $mdDialog.confirm()
          .title('Deseas borrarlo?')
          .ok('Si')
          .cancel('No');
        $mdDialog.show(confirm).then(function() {
          $http.post('../rest/rest.php/delete_pais', {
              id: pais.idpais
  		    }).then(function(data) {
		      if(data['data']!='"ok"'){
		        $mdToast.show(
              $mdToast.simple()
                .textContent('La operación ha fallado...')
                .hideDelay(3000)
            );    
            return;
		      }
		    });
  		    var index = $scope.paises.indexOf(pais);
          $scope.paises.splice(index, 1); 
  		    $mdToast.show(
          $mdToast.simple()
            .textContent('Pais borrado!')
            .hideDelay(3000)
          );
        });
      };
      
      $scope.new_pais=function(){
        var confirm = $mdDialog.prompt()
        .title('Nombre pais')
        .placeholder('Pais')
        .ok('Guardar')
        .cancel('Cancelar');
  
      $mdDialog.show(confirm).then(function(result) {
        $http.post('../rest/rest.php/new_pais', {
              nombre : result
		    }).then(function(data) {
		      if(data['data']!='"ok"'){
		        $mdToast.show(
              $mdToast.simple()
                .textContent('La operación ha fallado...')
                .hideDelay(3000)
            );    
            return;
		      }
		    });
		    $scope.search();
		    $mdToast.show(
          $mdToast.simple()
            .textContent('Pais añadido!')
            .hideDelay(3000)
        );
      });
      };
      
      $scope.new_ciudad=function() {
        $http.post('../rest/rest.php/new_ciudad', {
              nombre : $scope.tmp_ciudad.nombre,
              pais : $scope.tmp_ciudad.pais_idpais
		    }).then(function(data) {
		      if(data['data']!='"ok"'){
		        $mdToast.show(
              $mdToast.simple()
                .textContent('La operación ha fallado...')
                .hideDelay(3000)
            );    
            return;
		      }
		    });
        $scope.search();
        $scope.tmp_ciudad.nombre="";
        $scope.tmp_ciudad.nombre=undefined;
        $scope.tmp_ciudad.edit=false;
		    $mdToast.show(
          $mdToast.simple()
            .textContent('Ciudad añadida!')
            .hideDelay(3000)
        );
      };
      
      $scope.delete_ciudad=function(ciudad){
        var confirm = $mdDialog.confirm()
          .title('Deseas borrarlo?')
          .ok('Si')
          .cancel('No');
        $mdDialog.show(confirm).then(function() {
          $http.post('../rest/rest.php/delete_ciudad', {
              id: ciudad.idCiudad
  		    }).then(function(data) {
		      if(data['data']!='"ok"'){
		        $mdToast.show(
              $mdToast.simple()
                .textContent('La operación ha fallado...')
                .hideDelay(3000)
            );    
            return;
		      }
		    });
  		    var index = $scope.ciudades.indexOf(ciudad);
          $scope.ciudades.splice(index, 1); 
  		    $mdToast.show(
          $mdToast.simple()
            .textContent('Ciudad borrada!')
            .hideDelay(3000)
          );
        });
      };
      
      $scope.edit_ciudad=function(ciudad){
        $http.post('../rest/rest.php/edit_ciudad', {
              id: ciudad.idCiudad,
              nombre : ciudad.nombre,
              pais : ciudad.pais_idpais
		    }).then(function(data) {
		      if(data['data']!='"ok"'){
		        $mdToast.show(
              $mdToast.simple()
                .textContent('La operación ha fallado...')
                .hideDelay(3000)
            );    
            return;
		      }
		    });
		    ciudad.edit=false;
		    $mdToast.show(
          $mdToast.simple()
            .textContent('¡Ciudad actualizada!')
            .hideDelay(3000)
        );
      };
      
      $scope.edit_marca=function(marca){
        var confirm = $mdDialog.prompt()
        .title('Nombre marca')
        .placeholder('Marca')
        .initialValue(marca.nombre)
        .ok('Guardar')
        .cancel('Cancelar');
  
      $mdDialog.show(confirm).then(function(result) {
        $http.post('../rest/rest.php/edit_marca', {
              id: marca.idsupermercado,
              nombre : result
		    }).then(function(data) {
		      if(data['data']!='"ok"'){
		        $mdToast.show(
              $mdToast.simple()
                .textContent('La operación ha fallado...')
                .hideDelay(3000)
            );    
            return;
		      }
		    });
		    marca.nombre=result;
		    $mdToast.show(
          $mdToast.simple()
            .textContent('Marca actualizada!')
            .hideDelay(3000)
        );
      });
      };
      
      $scope.delete_marca=function(marca){
        var confirm = $mdDialog.confirm()
          .title('Deseas borrarlo?')
          .ok('Si')
          .cancel('No');
        $mdDialog.show(confirm).then(function() {
          $http.post('../rest/rest.php/delete_marca', {
              id: marca.idsupermercado
  		    }).then(function(data) {
		      if(data['data']!='"ok"'){
		        $mdToast.show(
              $mdToast.simple()
                .textContent('La operación ha fallado...')
                .hideDelay(3000)
            );    
            return;
		      }
		    });
  		    var index = $scope.marcas.indexOf(marca);
          $scope.marcas.splice(index, 1); 
  		    $mdToast.show(
          $mdToast.simple()
            .textContent('Marca borrada!')
            .hideDelay(3000)
          );
        });
      };
      
      $scope.new_marca=function(){
        var confirm = $mdDialog.prompt()
        .title('Nombre marca')
        .placeholder('Pais')
        .ok('Guardar')
        .cancel('Cancelar');
  
      $mdDialog.show(confirm).then(function(result) {
        $http.post('../rest/rest.php/new_marca', {
              nombre : result
		    }).then(function(data) {
		      if(data['data']!='"ok"'){
		        $mdToast.show(
              $mdToast.simple()
                .textContent('La operación ha fallado...')
                .hideDelay(3000)
            );    
            return;
		      }
		    });
		    $scope.search();
		    $mdToast.show(
          $mdToast.simple()
            .textContent('Marca añadida!')
            .hideDelay(3000)
        );
      });
      };
      
      $scope.new_local=function() {
        if($scope.tmp_local.habilitado!=true){
          $scope.tmp_local.habilitado=0;
        }
        else{
          $scope.tmp_local.habilitado=1;
        }
        $http.post('../rest/rest.php/new_local', {
              nombre : $scope.tmp_local.nombre,
              ciudad : $scope.tmp_local.Ciudad_idCiudad,
              habilitado: $scope.tmp_local.habilitado,
              marca: $scope.tmp_local.marca,
              direccion: $scope.tmp_local.direccion
		    }).then(function(data) {
		      if(data['data']!='"ok"'){
		        $mdToast.show(
              $mdToast.simple()
                .textContent('La operación ha fallado...')
                .hideDelay(3000)
            );    
            return;
		      }
		    });
        $scope.search();
        $scope.tmp_local.nombre="";
        $scope.tmp_local.habilitado=false;
        $scope.tmp_local.direccion="";
        $scope.tmp_local.edit=false;
		    $mdToast.show(
          $mdToast.simple()
            .textContent('Local añadido!')
            .hideDelay(3000)
        );
      };
      
      $scope.delete_local=function(local){
        var confirm = $mdDialog.confirm()
          .title('Deseas borrarlo?')
          .ok('Si')
          .cancel('No');
        $mdDialog.show(confirm).then(function() {
          $http.post('../rest/rest.php/delete_local', {
              id: local.idlocal
  		    }).then(function(data) {
		      if(data['data']!='"ok"'){
		        $mdToast.show(
              $mdToast.simple()
                .textContent('La operación ha fallado...')
                .hideDelay(3000)
            );    
            return;
		      }
		      });
  		    var index = $scope.locales.indexOf(local);
          $scope.locales.splice(index, 1); 
  		    $mdToast.show(
          $mdToast.simple()
            .textContent('Local borrado!')
            .hideDelay(3000)
          );
        });
      };
      
      $scope.edit_local=function(local){
        $http.post('../rest/rest.php/edit_local', {
              id: local.idlocal,
              nombre : local.nombre,
              ciudad : local.Ciudad_idCiudad,
              habilitado: local.habilitado? 1:0,
              marca: local.supermercado_idsupermercado,
              direccion: local.direccion
		    }).then(function(data) {
		      if(data['data']!='"ok"'){
		        $mdToast.show(
              $mdToast.simple()
                .textContent('La operación ha fallado...')
                .hideDelay(3000)
            );
            return;
		      }
		    });
		    local.edit=false;
		    $mdToast.show(
          $mdToast.simple()
            .textContent('Local actualizado!')
            .hideDelay(3000)
        );
      };
      
      $scope.search();
  }]);