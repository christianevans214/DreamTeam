app.factory("PromotionsFactory", function($http) {
	return {
		getAllPromotions: function() {
			return $http.get("api/promos")
				.then(function(res) {
					return res.data;
				})
		},
		getOnePromotion: function(id) {
			return $http.get(`api/promos/${id}`)
				.then(function(res) {
					return res.data;
				})
		},
		createPromotion: function(promoInfo) {
			return $http.post("api/promos", promoInfo)
				.then(function(res) {
					return res.data;
				})
		}
	}
})