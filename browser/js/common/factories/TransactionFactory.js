app.factory("TransactionFactory", function($http) {
	return {
		getTransaction: function(id) {
			return $http.get(`api/transaction/${id}`)
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
		submitTransaction: function(info) {
			return $http.post('api/transaction', info)
				.then(function(res) {
					return res.data;
				})
		},
		updateTransaction: function(id, updateInfo) {
			return $http.put(`api/transaction/${id}`, updateInfo)
				.then(function(res) {
					return res.data;
				})
		},
		changeTransaction: function(id, status) {
			return this.updateTransaction(id, {
				"status": status
			})
		},
		emailTransaction: function(order) {
			console.log('JSONorder', order);

			return $http.post('api/transaction/email', order)
				.then(function(res) {
					return res.data;
				})
		}

	}
})