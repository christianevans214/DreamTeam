app.config(function($stateProvider) {
	$stateProvider.state('admin.transactionManagement', {
		url: '/transactionManagement',
		templateUrl: 'js/admin/substates/transactionManagement/transactionManagement.html',
		controller: 'transactionManagementController'
	})
})

app.controller('transactionManagementController', function($scope, TransactionFactory, transactions) {
	// console.log($scope.transactions);
	$scope.filter = "All";
	$scope.categories = ["Created", "Pending", "Processing", "Completed", "Cancelled", "All"];
	$scope.filterBy = function(category) {
		$scope.filter = category;
	}
	$scope.updateStatus = function(id, newInfo) {
		// console.log("yes this works");
		TransactionFactory.updateTransaction(id, newInfo)
			.then(function(res) {
				console.log(res);
			})
	}
})