app.factory('UserFactory', function($http) {
	return {
		getAllUsers: function() {
			return $http.get('api/account')
				.then(function(res) {
					return res.data;
				})
		},
		getUser: function(id) {
			return $http.get('api/account/' + id)
				.then(function(res) {
					return res.data;
				})
		},
		updateUser: function(id, data) {
			// console.log(this);
			return $http.put(`api/account/${id}`, data)
				.then(function(res) {
					return res.data;
				})
		},
		triggerPWChange: function(id) {
			return this.updateUser(id, {
				needPWChange: true
			})
		},
		deleteUser: function(id) {
			return $http.delete('api/account' + id)
				.then(function(res) {
					return res.data;
				})
		},
		makeAdmin: function(id) {
			return this.updateUser(id, {
				isAdmin: true
			})
		}

	}
})