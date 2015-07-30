app.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		controller: 'HomeController',
		templateUrl: 'js/home/home.html'
	});
});

app.controller("HomeController", function($scope, $element, AuthService, $interval, $state, AUTH_EVENTS, $rootScope) {
	$scope.hello = "hello";
	$interval(function() {
		$scope.fadeIn = "faded";
	}, 100)
	$scope.background = "store";
	var setUser = function() {
		AuthService.getLoggedInUser().then(function(user) {
			$scope.user = user;
			// console.log(user);
			//$rootScope.user = user?
		});
	};
	var removeUser = function() {
		$scope.user = null;
	};

	$scope.goToAccount = function(userId) {
		if (userId) {
			$state.go('account', {
				id: userId
			})
		} else {
			$state.go('login')
		}
	}
	setUser();
	$rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
	$rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
	$rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);
})