app.factory("AlbumFactory", function($http) {
	return {
		getAlbums: function() {
			return $http.get('api/albums')
				.then(function(response) {
					return response.data
				})
		},
		getAlbum: function(id) {
			return $http.get(`api/albums/${id}`)
				.then(function(response) {
					return response.data;
				})
		},
		updateAlbum: function(id, updateInfo) {
			return $http.put('api/albums/' + id, updateInfo)
				.then(function(res) {
					return res.data;
				})
		},
		outOfStock: function(id) {
			return this.updateAlbum(id, {
				isInStock: false
			})
		},
		deleteAlbum: function(id) {
			return $http.delete("api/albums/" + id)
				.then(function(res) {
					return res.data;
				})
		},
		createAlbum: function(albumInfo) {
			console.log(albumInfo);
			return $http.post('api/albums', albumInfo)
				.then(function(res) {
					return res.data;
				})
		}

	}
})