app.config(function($stateProvider) {

	// Register our *about* state.
	$stateProvider.state('store', {
		url: '/store',
		controller: 'StoreController',
		templateUrl: 'js/store/store.html'
	});

});

app.controller('StoreController', function($scope) {
	// $scope.searchCriteria = ['Album Title', 'Artist', 'Genre', 'Year']
	$scope.searchCriteria = [{
		title: 'Album Title',
		state: "store.albumTitle"
	}, {
		title: "Artist",
		state: "store.artist"
	}, {
		title: "Genre",
		state: "store.genre"
	}, {
		title: "Year",
		state: "store.year"
	}]

});