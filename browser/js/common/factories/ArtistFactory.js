app.factory("ArtistFactory", function($http) {
	return {
		getArtists: function() {
			return $http.get('api/artists')
				.then(function(response) {
					return response.data
				})
		},
		getArtist: function(id) {
			return $http.get(`api/artists/${id}`)
				.then(function(response) {
					return response.data;
				})
		},
		createArtist: function(newInfo) {
			return $http.post('api/artists', newInfo)
				.then(function(response) {
					return response.data;
				})
		}
	}
})