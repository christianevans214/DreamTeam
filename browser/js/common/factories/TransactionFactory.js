app.factory("TransactionFactory", function($http) {
	return {
		getTransaction: function(id) {
			return $http.get("api/transaction" + id)
				.then(function(res) {
					return res.data;
				})
		},
		getAllTransactions: function() {
			return $http.get("api/transaction")
				.then(function(res) {
					return res.data
				})
		},
		updateTransaction: function(id, updateInfo) {
			return $http.put("api/transaction" + id, updateInfo)
				.then(function(res) {
					return res.data;
				})
		}

	}
})