app.config(function($stateProvider) {
	$stateProvider.state('admin.artistManagement', {
		url: '/artistManagement',
		templateUrl: 'js/admin/substates/artistManagement/artistManagement.html',
		controller: 'artistManagementController'
	})
})

app.controller('artistManagementController', function($scope, ArtistFactory) {

})