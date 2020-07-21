/**
 * @author a.demeshko
 * created on 21.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.test')
    .controller('TestCtrl',['$scope','$http',TestCtrl]);
	
	function TestCtrl($scope,$http) {
		$scope.clkcount = 0;
		$scope.ngclickCtrl = function() {

			return $http({
                url: '/test',
                method: 'GET'
            })

			};
		
		
    }
	
	
	

 
})();