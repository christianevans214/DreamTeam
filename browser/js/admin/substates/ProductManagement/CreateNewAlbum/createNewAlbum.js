app.config(function($stateProvider) {
	$stateProvider.state("admin.createAlbum", {
		url: '/productManagement/createAlbum',
		templateUrl: 'js/admin/substates/ProductManagement/CreateNewAlbum/createNewAlbum.html',
		controller: 'CreateNewAlbumController'
	})
})

app.controller("CreateNewAlbumController", function($rootScope, $state, $scope, ArtistFactory, AlbumFactory, artists) {
	$scope.album = {
		genre: []
	}
	$scope.createNewAlbum = function(albumInfo) {
		var nameToHold = albumInfo.artist.name;
		if (albumInfo.image === "") albumInfo.image = undefined;
		albumInfo.artist = artists.filter(function(artist) {
			if (artist.name === albumInfo.artist.name) return true;
		})[0]
		console.log(albumInfo)
		if (albumInfo.artist) albumInfo.artist = albumInfo.artist._id;
		if (!albumInfo.artist) {
			ArtistFactory.createArtist({
					name: nameToHold
				})
				.then(function(newArtist) {
					console.log("new artist made", newArtist);
					albumInfo.artist = newArtist._id;
					return AlbumFactory.createAlbum(albumInfo)
				})
				.then(function(createdAlbum) {
					console.log(createdAlbum);
					$scope.album = createdAlbum;
					albumInfo.artist = createdAlbum.artist;
					$rootScope.$broadcast("newAlbum", createdAlbum)
					$state.go('admin.productManagement')
				})
		} else {
			AlbumFactory.createAlbum(albumInfo)
				.then(function(createdAlbum) {
					console.log("artist existed", createdAlbum);
					$scope.album = createdAlbum;
					albumInfo.artist = createdAlbum.artist;
					$rootScope.$broadcast("newAlbum", createdAlbum)
					$state.go('admin.productManagement')
				})
		}
	}
})