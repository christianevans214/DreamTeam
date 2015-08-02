app.config(function($stateProvider) {
	$stateProvider.state('admin.promoManagement', {
		url: '/promoManagement',
		templateUrl: 'js/admin/substates/promoManagement/promoManagement.html',
		controller: 'PromoManagementController'
	})
})

app.controller('PromoManagementController', function($scope) {

})