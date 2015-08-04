app.factory("ReviewFactory", function($http) {
	return {
		deleteReview: function(id) {
			return $http.delete("api/reviews/" + id)
				.then(function(res) {
					return res.data;
				})
		},
		createReview: function(reviewsInfo) {
			return $http.post('api/reviews', reviewsInfo)
				.then(function(res) {
					return res.data;
				})
		}
	}
})