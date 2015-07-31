app.config(function($stateProvider) {
	$stateProvider.state("admin.viewProduct", {
		url: '/productManagement/viewProduct/:id',
		templateUrl: 'js/admin/substates/ProductManagement/AdminProductView/productManagementView.html',
		controller: 'ProductManagementView'
	})
})

app.controller('ProductManagementView', function($rootScope, $state, $scope, AlbumFactory, ArtistFactory, $stateParams, albums, artists) {
	$scope.album = albums.filter(function(album) {
			if (album._id === $stateParams.id) return true;
		})[0]
		//this is still broken...and looks awful. 
	$scope.submitChanges = function(id, albumChanges) {
		var nameToHold = albumChanges.artist.name;
		albumChanges.artist = artists.filter(function(artist) {
			// console.log("artist", artist, "albumChanges", albumChanges)
			if (artist.name === albumChanges.artist.name) return true;
		})[0]
		if (albumChanges.artist) albumChanges.artist = albumChanges.artist._id;
		if (!albumChanges.artist) {
			ArtistFactory.createArtist({
					name: nameToHold
				})
				.then(function(newArtist) {
					console.log("new artist made", newArtist);
					albumChanges.artist = newArtist._id;
					return AlbumFactory.updateAlbum(id, albumChanges)
				})
				.then(function(updatedAlbum) {
					console.log(updatedAlbum);
					$scope.album = updatedAlbum;
					albumChanges.artist = updatedAlbum.artist;
					$state.go('admin.productManagement')
				})
		} else {
			AlbumFactory.updateAlbum(id, albumChanges)
				.then(function(updatedAlbum) {
					console.log("artist existed", updatedAlbum);
					$scope.album = updatedAlbum;
					albumChanges.artist = updatedAlbum.artist;
					$state.go('admin.productManagement')
				})
		}
	}

})