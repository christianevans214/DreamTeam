app.config(function($stateProvider) {
	$stateProvider.state('account', {
		url: '/account/:id',
		controller: 'AccountController',
		templateUrl: 'js/account/account.html',
		data: {
			authenticate: true
		},
		resolve: {
			user: function(UserFactory, $stateParams) {
				return UserFactory.getUser($stateParams.id);
			}
		}
	})
})

app.factory('UserFactory', function($http) {
	return {
		getUser: function(id) {
			return $http.get('api/account/' + id)
				.then(function(res) {
					return res.data;
				})
		}
	}
})

app.controller('AccountController', function($scope, UserFactory, user) {
	$scope.user = user;
	console.log("$scope.user", $scope.user)
})