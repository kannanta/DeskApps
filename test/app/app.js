'use strict';

var MyApp = angular.module('BlurAdmin', [
  'MyApp.controllers',
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',

  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'angularjs-crypto'
]);

MyApp.run(function(cfCryptoHttpInterceptor, $rootScope) {
  
	
	let possible = "mnopqrstuvwxyzabcdefghijkl1234567890";
	let text = "";
	let texts = "";
	const lengthOfCode = 32;
	for (let i = 0; i < lengthOfCode; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
  
  const lengthOfCodes = 16;
  for (let i = 0; i < lengthOfCodes; i++) {
    texts += possible.charAt(Math.floor(Math.random() * possible.length));
  }
    

    $rootScope.base64Key = CryptoJS.enc.Hex.parse("0123456789abcdef0123456789abcdef")
	//'0123456789abcdef0123456789abcdef')
	
    $rootScope.iv = CryptoJS.enc.Hex.parse("abcdef0123456789abcdef0123456789")
	//'abcdef9876543210abcdef9876543210')
	
}) .config(['$httpProvider', function ($httpProvider) {
	console.log($httpProvider.defaults.headers);
}])

angular.module('MyApp.controllers', []).controller('myappController', function($scope, $rootScope,$http) {
	$scope.source_string = 'mnopqrstuvwxyzabcdefghijkl1234567890';
    
	console.log('source String = ' + $scope.source_string);
 
	var encrypted = CryptoJS.AES.encrypt(
						$scope.source_string,
						$rootScope.base64Key,
						{ iv: $rootScope.iv }
					);
	
	console.log('encrypted = ' + encrypted);
	
	
 
	$scope.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
	
	console.log('ciphertext = ' + $scope.ciphertext);
 
	var cipherParams = CryptoJS.lib.CipherParams.create({
		ciphertext: CryptoJS.enc.Base64.parse($scope.ciphertext)
	});
	var decrypted = CryptoJS.AES.decrypt(
						cipherParams,
						$rootScope.base64Key,
						{ iv: $rootScope.iv }
					);
	console.log('decrypted='+decrypted);
	$scope.descrString = decrypted.toString(CryptoJS.enc.Utf8);
	console.log('decrypted='+$scope.descrString);
	
	let reqToken = $http({
		url: '/genPack?init='+$scope.ciphertext+'&base64='+$rootScope.base64Key+'&iv'+$rootScope.iv,
		method: 'GET'
	})
});

//function studentController($scope,$https) {
  // var url = "/invoke-script";

   //$https.get(url).success( function(response) {
     // $scope.students = response; 
   //});
//}
//$('#myButton').click(function() {
  //  $.ajax({
    //    url: "/invoke-script"
 //   });
//});