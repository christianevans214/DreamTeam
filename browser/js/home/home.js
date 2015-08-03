app.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		controller: 'HomeController',
		templateUrl: 'js/home/home.html'
	});
});

app.controller("HomeController", function($scope, $element, AuthService, $interval, $state, AUTH_EVENTS, $rootScope) {
	$scope.hello = "hello";
	$scope.accountTitle = "Login";
	// if (scope.user) {
	// 	$scope.accountTitle = "View Your Account"
	// }
	$interval(function() {
		$scope.fadeIn = "faded";
	}, 100)
	$scope.background = "store";
	var setUser = function() {
		AuthService.getLoggedInUser().then(function(user) {
			$scope.user = user;
			if ($scope.user) {
				$scope.accountTitle = "View Your Account";

			}
			console.log(user);
			//$rootScope.user = user?
		});
	};
	var removeUser = function() {
		$scope.user = null;
		$scope.accountTitle = "Login"
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