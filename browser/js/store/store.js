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
	$scope.filterObject = {};
});