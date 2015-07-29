app.config(function ($stateProvider){
	$stateProvider.state('account', {
		url: '/account/:id',
		controller: 'AccountController',
		templateUrl: 'js/account/account.html',
		// data: {
		// 	authenticate: true
		// }, 
		resolve: {
			user: function(UserFactory, $stateParams){
				return UserFactory.getUser($stateParams.id);
			}
		}
	})
})

app.controller('AccountController', function($scope, UserFactory, user, $rootScope){
	$scope.user = user;
	$rootScope.$on("editedUser", function(event, data){
		// console.log("event caught!", data);
		$scope.user = data;
		$scope.$digest();
	} )
})
