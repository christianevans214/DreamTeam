app.config(function ($stateProvider){
	$stateProvider.state('account.editProfile', {
		url: '/editProfile',
		templateUrl: 'js/account/substates/editProfile/editProfile.html',
		controller: "accountEditController"
	})
})

app.controller('accountEditController', function($scope, UserFactory, $state, $rootScope){
		$scope.submitUpdate = function(updatedUser){
			UserFactory.updateUser($scope.user._id, updatedUser)
			.then(function(newUpdatedUser){
				$rootScope.$broadcast("editedUser", newUpdatedUser)
				$state.go('account')
			})
		}	
	})
