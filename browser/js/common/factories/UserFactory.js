app.factory('UserFactory', function ($http, $rootScope) {
	return {
		updateUser: function(id, data){
			return $http.put(`/api/account/${id}`, data)
			.then(function(res){
				return res.data;
			})
		}/*, 
		editQuantity: function(id){
			var matches = $rootScope.user.cart.filter((elem) => {
				return elem.album._id === id;
			})
			return matches.length;
		}*/
	}
})