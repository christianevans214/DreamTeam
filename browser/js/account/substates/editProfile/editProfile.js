app.config(function ($stateProvider){
	$stateProvider.state('account.editProfile', {
		url: '/editProfile',
		templateUrl: 'js/account/substates/editProfile/editProfile.html'
	})
})

app.controller('accountEditController', function($scope, UserFactory){
		
	})
