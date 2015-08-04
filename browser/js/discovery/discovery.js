app.config(function($stateProvider) {
	$stateProvider.state('discovery', {
		url: '/discovery',
		controller: 'DiscoveryController',
		templateUrl: 'js/discovery/discovery.html',
		resolve: {
			featuredAlbum: function(AlbumFactory) {
				return AlbumFactory.getAlbums()
			}
		}
	});
});

app.controller('DiscoveryController', function($scope, AlbumFactory, featuredAlbum, $state){

	console.log("heyyyy");

	$scope.feature = featuredAlbum[Math.floor(Math.random()*featuredAlbum.length)]

	$scope.goToAlbumDetail = function(){
		$state.go('albumDetail', {albumId: $scope.feature._id})
	}
	
})




