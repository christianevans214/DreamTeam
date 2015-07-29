app.config(function($stateProvider) {

	// Register our *about* state.
	$stateProvider.state('store', {
		url: '/store',
		controller: 'StoreController',
		templateUrl: 'js/store/store.html',
	});

});

app.controller('StoreController', function($scope, AlbumFactory) {
	AlbumFactory.getAlbums().then(function(albums) {
			$scope.albums = albums;
			console.log(albums);
		})
		// $scope.searchCriteria = ['Album Title', 'Artist', 'Genre', 'Year']
		// $scope.searchCriteria = [{
		// 		title: 'Album Title',
		// 		state: "store.albumTitle"
		// 	}, {
		// 		title: "Artist",
		// 		state: "store.artist"
		// 	}, {
		// 		title: "Genre",
		// 		state: "store.genre"
		// 	}, {
		// 		title: "Year",
		// 		state: "store.year"
		// 	}]
		// $scope.filterObject = {
		// 	artistName: undefined,
		// 	album: undefined,
		// 	price: undefined,
		// 	tags: [],
		// 	genre: [],
		// };
	$scope.filterObject = {};
});