app.config(function($stateProvider) {
	$stateProvider
		.state('admin', {
			url: '/admin',
			controller: "AdminController",
			templateUrl: "js/admin/admin.html"
		})
})

app.controller("AdminController", function($scope, UserFactory) {
	$scope.hello = "hello";
	UserFactory.getAllUsers()
		.then(function(users) {
			console.log(users);
		})
})