app.config(function($stateProvider) {
	$stateProvider.state('admin.transactionManagement', {
		url: '/transactionManagement',
		templateUrl: 'js/admin/substates/transactionManagement/transactionManagement.html',
		controller: 'transactionManagementController'
	})
})

app.controller('transactionManagementController', function($scope, TransactionFactory, transactions) {
	console.log($scope.transactions)
	$scope.transactions.push({
			user: "obamaMama",
			email: "I<3Puppies",
			dateOrdered: new Date(),
			status: "Pending",
			trackingNumber: "123EFA1234",
			_id: "123FERES432",
			purchases: [])
	})
})