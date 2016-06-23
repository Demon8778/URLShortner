var app = angular.module('Urlshorten', []).controller('Urlctrl', ["$scope", "$http", function($scope, $http){

	 
	$scope.send = function(data){
		console.log(data.url);

		$http.post('/url/shorten', data).success(function(response){
			console.log(response);
			if(response){
				
				$scope.url = response.shortUrl;
				console.log($scope.url);
			}
		})
	}
}])