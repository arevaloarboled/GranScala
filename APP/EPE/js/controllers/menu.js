'use strict';

(function() {

  /**
   * @ngdoc function
   * @name webApp.controller:MenuCtrl
   * @description
   * # MenuCtrl
   * Controller of the webApp
   */
  angular.module('webApp')
    .controller('MenuCtrl', [
      '$scope',
      '$q',
      '$mdSidenav',
      '$mdMedia',
      'LinksService','$window',
      MenuCtrl]);

  function MenuCtrl($scope, $q, $mdSidenav, $mdMedia, LinksService, $window) {
    $scope.tags;
    $scope.id=getCookie("id");
    $scope.user=getCookie("user");
    $scope.lvl=getCookie("lvl");
    
    $scope.$watch(function() { return LinksService.getTags(); },
      function(value) {
        $scope.tags = value;
      }
    );

    $scope.getMinRes = function(){
      return $mdMedia('gt-xs');
    };

    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

    $scope.searchByTag = function(tagName){
      LinksService.setSearchFilter(tagName);
      $mdSidenav('left').close();
    };

    $scope.searchByAllTags = function(){
      LinksService.setSearchFilter("*");
      $mdSidenav('left').close();
    };

    $scope.getAllLinksCount = function(){
      return LinksService.getLinks().length;
    };

    $scope.getTagsCount = function(tagName){
      return LinksService.getTagsCount(tagName);
    };
    
    $scope.logout= function(){
      delete_cookie("id");
      delete_cookie("user");
      delete_cookie("lvl");
      $scope.openLeftMenu();
      $window.location.href = $window.location.pathname;
		  $window.reload;
		  console.log('sfsfjslfjlsjfsd');
    };
  }

})();
