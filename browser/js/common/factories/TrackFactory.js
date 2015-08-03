app.factory('TrackFactory', function ($http) {
	return {
		fetchTracks: function (albumId) {
			return $http.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`)
				.then(function(res){
					console.log("TrackFactory", res);
					return res.data;
				})
        },
	    searchAlbums: function (query) {
	    	return $http.get('https://api.spotify.com/v1/search' + query)
    			.then(function(res){
    				return res.data;
    			})
		}
	}
})