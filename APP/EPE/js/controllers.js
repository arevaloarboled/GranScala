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
      
epeControllers.controller('LogIn', ['$scope', '$http','$window','$mdDialog',
  function ($scope, $http,$window,$mdDialog) {
      if(getCookie("id")!=undefined){
          $window.location.href = $window.location.pathname+'#/principal';
		  $window.reload;
      }
      $scope.send = function () {
          $http.post('../rest/rest.php/login', {
              usuario : $scope.usuario,
              pass : $scope.pass,
		}).then(function (data) {
		    data=data['data'];
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
  
  epeControllers.controller('principal', ['$scope', '$http','$window','$mdDialog',
  function ($scope, $http,$window) {
      if(getCookie("id")==undefined){
          $window.location.href = $window.location.pathname;
		  $window.reload;
      }
  }]);
  
  epeControllers.controller('administrar', ['$scope', '$http','$window','$mdDialog','$mdToast','$mdSidenav',
  function ($scope, $http,$window,$mdDialog,$mdToast,$mdSidenav) {
      if(getCookie("id")==undefined){
          $window.location.href = $window.location.pathname;
		  $window.reload;
      };
      
      $scope.paises = [];
      $scope.ciudades = [];
      
      $scope.search = function() {
          $http.get('../rest/rest.php/get_all').then(function(data) {
		        data = data['data'];
		        $scope.paises=data[0];
		        $scope.ciudades=data[1];
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
		    });
		    $scope.search();
		    $mdToast.show(
          $mdToast.simple()
            .textContent('Pais añadido!')
            .hideDelay(3000)
        );
      });
      };
      
      $scope.sacar=function(componentId) {
        console.log("hola");
        console.log(componentId);
        return function() {
         $mdSidenav(componentId).toggle();
        }
      };

      
      $scope.edit_ciudad=function(ciudad){
         /*$mdDialog.show({
          controller: DialogController,
          templateUrl: 'dialog1.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {*/
          
          
        var confirm = $mdDialog.prompt()
        .title('Nombre ciudad')
        .placeholder('Pais')
        .initialValue(pais.nombre)
        .ok('Guardar')
        .cancel('Cancelar');
  
      $mdDialog.show(confirm).then(function(result) {
        $http.post('../rest/rest.php/edit_pais', {
              id: pais.idpais,
              nombre : result
		    });
		    pais.nombre=result;
		    $mdToast.show(
          $mdToast.simple()
            .textContent('Pais actualizado!')
            .hideDelay(3000)
        );
      });
      };
      
      $scope.delete_ciudad=function(pais){
        var confirm = $mdDialog.confirm()
          .title('Deseas borrarlo?')
          .ok('Si')
          .cancel('No');
        $mdDialog.show(confirm).then(function() {
          $http.post('../rest/rest.php/delete_pais', {
              id: pais.idpais
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
      
      $scope.new_ciudad=function(){
        var confirm = $mdDialog.prompt()
        .title('Nombre ciudad')
        .placeholder('Pais')
        .ok('Guardar')
        .cancel('Cancelar');
  
      $mdDialog.show(confirm).then(function(result) {
        $http.post('../rest/rest.php/new_pais', {
              nombre : result
		    });
		    $scope.search();
		    $mdToast.show(
          $mdToast.simple()
            .textContent('Pais añadido!')
            .hideDelay(3000)
        );
      });
      };
      $scope.search();
  }]);