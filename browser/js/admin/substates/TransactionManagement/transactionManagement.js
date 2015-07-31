app.config(function($stateProvider) {
	$stateProvider.state('admin.transactionManagement', {
		url: '/transactionManagement',
		templateUrl: 'js/admin/substates/transactionManagement/transactionManagement.html',
		controller: 'transactionManagementController'
	})
})

app.controller('transactionManagementController', function($scope, TransactionFactory) {

})