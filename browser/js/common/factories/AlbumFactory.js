app.factory("AlbumFactory", function($http) {
	return {
		getAlbums: function() {
			return $http.get('/api/albums')
				.then(function(response) {
					return response.data
				})
		},
		getAlbum: function(id) {
			return $http.get('/api/albums/' + id)
				.then(function(response) {
					return response.data;
				})
		}
	}
})