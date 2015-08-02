app.config(function($stateProvider) {
	$stateProvider.state("admin.viewTransaction", {
		url: '/transactionManagement/viewTransaction/:id',
		templateUrl: 'js/admin/substates/TransactionManagement/AdminTransactionView/AdminTransactionView.html',
		controller: 'TransactionManagementView'
	})
})

app.controller("TransactionManagementView", function($scope, $state, TransactionFactory, $stateParams) {
	$scope.transaction = $scope.transactions.filter(function(transaction) {
		if ($stateParams.id === transaction._id) return true;
	})[0];
})