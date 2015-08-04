app.config(function($stateProvider) {
	$stateProvider.state("admin.viewProduct", {
		url: '/productManagement/viewProduct/:id',
		templateUrl: 'js/admin/substates/ProductManagement/AdminProductView/productManagementView.html',
		controller: 'ProductManagementView'
	})
})

app.controller('ProductManagementView', function($rootScope, $state, $scope, AlbumFactory, ArtistFactory, $stateParams) {

	$scope.album = $scope.albums.filter(function(album) {
			if (album._id === $stateParams.id) return true;
		})[0]
		//this is not broken, but should be placed in a factory...or...like half its current size.
	$scope.submitChanges = function(id, albumChanges) {
		var nameToHold = albumChanges.artist.name;
		albumChanges.artist = $scope.artists.filter(function(artist) {

			if (artist.name === albumChanges.artist.name) return true;
		})[0]
		if (albumChanges.artist) albumChanges.artist = albumChanges.artist._id;
		if (!albumChanges.artist) {
			ArtistFactory.createArtist({
					name: nameToHold
				})
				.then(function(newArtist) {
					albumChanges.artist = newArtist._id;
					console.log("newArtist._id", newArtist._id);
					console.log("ID", id)
					console.log("ALBUM CHANGES", albumChanges);
					return AlbumFactory.updateAlbum(id, albumChanges)
				})
				.then(function(updatedAlbum) {
					$scope.album = updatedAlbum;
					albumChanges.artist = updatedAlbum.artist;
					$state.go('admin.productManagement')
				})
		} else {
			console.log("ID", id)
			console.log("ALBUM CHANGES", albumChanges);
			AlbumFactory.updateAlbum(id, albumChanges)
				.then(function(updatedAlbum) {
					$scope.album = updatedAlbum;
					albumChanges.artist = updatedAlbum.artist;
					$state.go('admin.productManagement', {}, { reload: true })
				})
		}
	}

})