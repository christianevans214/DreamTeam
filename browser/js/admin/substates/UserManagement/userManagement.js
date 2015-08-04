app.config(function($stateProvider) {
	$stateProvider.state('admin.userManagement', {
		url: '/userManagement',
		templateUrl: 'js/admin/substates/userManagement/userManagement.html',
		controller: 'userManagementController'
	})
})

app.controller('userManagementController', function($scope, UserFactory, users) {
	// $scope.users = users;
})