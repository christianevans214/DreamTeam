app.config(function($stateProvider) {
	$stateProvider
		.state('admin', {
			url: '/admin',
			controller: "AdminController",
			templateUrl: "js/admin/admin.html",
			resolve: {
				users: function(UserFactory) {
					return UserFactory.getAllUsers()
				},
				albums: function(AlbumFactory) {
					return AlbumFactory.getAlbums()
				},
				artists: function(ArtistFactory) {
					return ArtistFactory.getArtists()
				},
				transactions: function(TransactionFactory) {
					return TransactionFactory.getAllTransactions()
				}

			}
		})
})

app.controller("AdminController", function($rootScope, $scope, UserFactory, TransactionFactory, AlbumFactory, users, albums, artists, transactions) {
	$scope.users = users;
	$scope.abums = albums;
	$scope.artists = artists;
	$scope.transactions = transactions;
	// $rootScope.$on('updatedAlbum', function(event, data) {
	// 	console.log("EMITTED", data);
	// 	$scope.albums = data;
	// 	albums = data;
	// 	$scope.$digest();
	// })
})