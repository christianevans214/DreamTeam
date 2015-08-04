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
			var promoToCreate = {
				validProducts: []
			};
			promoToCreate.code = promoInfo.code;
			for (var genre in promoInfo.validGenres) {
				console.log("genre", genre, promoInfo.validGenres);
				if (promoInfo.validGenres[genre] === true) promoToCreate.validProducts.push(genre);
			}
			promoToCreate.expireString = promoInfo.expireString;
			promoToCreate.createdAt = new Date();
			promoToCreate.expireAt = new Date(promoToCreate.createdAt.valueOf() + 60 * 60 * 1000 * parseInt(promoToCreate.expireString));

			console.log(promoToCreate);
			return $http.post("api/promos", promoToCreate)
				.then(function(res) {
					console.log("SUCCESS")
					return res.data;
				})
		}

	}
})