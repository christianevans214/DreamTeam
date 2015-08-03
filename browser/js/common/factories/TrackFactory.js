app.factory('TrackFactory', function ($http) {
	return {
		fetchTracks: function (albumId, callback) {
			return $http.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`)
				.then(function(res){
					res.data;
				})
        },
	    searchAlbums: function (query) {
	    	return $http.post('https://api.spotify.com/v1/search', query)
    			.then(function(res){
    				return res.data;
    			})
		}
	}
})