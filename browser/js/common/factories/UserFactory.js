app.factory('UserFactory', function($http){
	return {
		getUser: function(id){
			return $http.get('api/account/' + id)
			.then(function(res){
				return res.data;
			})
		},
		updateUser: function(id, data){
			return $http.put(`api/account/${id}`, data)
			.then(function(res){
				return res.data;
			})
		}
	}
})