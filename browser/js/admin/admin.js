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
				},
				isAdmin: function() {
					return false;
				}

			}
		})
})

app.controller("AdminController", function($state, $rootScope, $scope, UserFactory, TransactionFactory, AlbumFactory, users, albums, artists, transactions) {
	$scope.users = users;
	$scope.abums = albums;
	$scope.artists = artists;
	$scope.transactions = transactions;
	//should make an Admin service that has all these functions for deleting things/updating things/what not
	$scope.deleteUser = function(id) {
		//front-end deletion of $scope.users
		$scope.users = $scope.users.filter(function(album) {
				if (album._id === id) return false;
				return true;
			})
			//DB deletion of users
		UserFactory.deleteUser(id)
			.then(function(response) {
				console.log(response);
				$state.go('admin.userManagement')
			})
	}
})