app.config(function($stateProvider) {
	// Register our *about* state.
	$stateProvider.state('store.albumTitle', {
		url: '/title',
		controller: 'albumTitleController',
		templateUrl: 'js/store/search-menu/albumTitle.html'
	});

});

app.controller('albumTitleController', function($scope) {
	$scope.filterCriteria = ['Album Title', 'Artist', 'Genre', 'Year']
		// $scope.genres = ['Alternative', 'Blues', 'Classical', 'Country', 'Dance', "Electronic", 'Fitness & Workout', 'Greatest Hits', 'Hip-Hop | Rap', 'Indie', 'Jazz', 'Latin', 'Metal', 'Pop', 'R&B | Soul', 'Reggae', "Rock", "World"];

});

//NOTE WE PROBABLY JUST WANT ONE STATE FOR SEARCH, AND BE ABLE TO FILTER OFF THE MULTIPLE THINGS THAT WE SELECT. THAT WOULD BE BETTER