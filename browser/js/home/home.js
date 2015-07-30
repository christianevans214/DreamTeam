app.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		controller: 'HomeController',
		templateUrl: 'js/home/home.html'
	});
});

app.controller("HomeController", function($scope, $element, $interval) {
	$scope.hello = "hello";
	$interval(function() {
		$scope.fadeIn = "faded";
	}, 100)
	$scope.background = "store";
})