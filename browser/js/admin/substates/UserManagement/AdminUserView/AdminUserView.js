app.config(function($stateProvider) {
	$stateProvider.state("admin.viewUser", {
		url: '/userManagement/viewUser/:id',
		templateUrl: 'js/admin/substates/UserManagement/AdminUserView/AdminUserView.html',
		controller: 'AdminUserView'
	})
})

app.controller("AdminUserView", function($scope, $state, UserFactory, users, $stateParams) {
	$scope.hello = "Hello";
	$scope.user = users.filter(function(user) {
		if ($stateParams.id === user._id) return true;
	})[0]
	$scope.makeAdmin = function(id) {
		if (confirm("Are you sure you want to promote the user to Administrative Status?")) {
			UserFactory.makeAdmin(id)
				.then(function(response) {
					$scope.user.isAdmin = true;
					console.log(response);
				})
		}
	}
	$scope.triggerPW = function(id) {
		UserFactory.triggerPWChange(id)
			.then(function(response) {
				console.log(response);
			})
	}

})