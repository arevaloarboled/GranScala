'use strict';

function setCookie(c_name,value,exdays)
{
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + 
    ((exdays==null) ? "" : ("; expires="+exdate.toUTCString()));
  document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
 var i,x,y,ARRcookies=document.cookie.split(";");
 for (i=0;i<ARRcookies.length;i++)
 {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
  {
   return unescape(y);
  }
 }
}

function delete_cookie( name ) {
  var c_value=escape("null") + "; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie=name + "=" + c_value;
}


//console.log(getCookie("id"));

(function() {
  /**
   * @ngdoc overview
   * @name webApp
   * @description
   * # webApp
   *
   * Main module of the application.
   */
  angular
    .module('webApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      //'ngTouch',
      'ngMaterial',
      'ngTagsInput'
    ])
    .config(function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/login.html',
          controller: 'LogIn'
        })
        .when('/principal', {
          templateUrl: 'views/principal.html',
          controller: 'principal'
        })
        .when('/administrar', {
          templateUrl: 'views/administrar.html',
          controller: 'administrar'
        })
        .when('/faltas', {
          templateUrl: 'views/faltas.html'
        })
        .when('/perfil', {
          templateUrl: 'views/perfil.html'
        })
        .when('/turnos', {
          templateUrl: 'views/turnos.html',
          controller: 'turnos'
        })
        .when('/signin', {
          templateUrl: 'views/signin.html',
          controller: 'signin'
        })
        .when('/verify', {
          templateUrl: 'views/verify.html',
          controller: 'verify'
        })
        .when('/horarios_local', {
          templateUrl: 'views/horarios_local.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
      .primaryPalette('indigo');
      //.accentPalette('red');
    });

})();
