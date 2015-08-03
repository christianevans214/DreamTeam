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
				promos: function(PromotionsFactory) {
					return PromotionsFactory.getAllPromotions()
				}

			}
		})
})

app.controller("AdminController", function($state, $rootScope, $scope, UserFactory, TransactionFactory, AlbumFactory, users, albums, artists, transactions, promos) {
	$scope.options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: "numeric",
		minute: "numeric",
		second: "numeric"
	};
	$scope.users = users;
	$scope.abums = albums;
	$scope.artists = artists;
	$scope.transactions = transactions;
	// $scope.promos = promos;
	$scope.promos = promos.map(function(promo) {
		console.log(promo)
		promo.createdAt = new Date(promo.createdAt).toLocaleDateString('en-US', $scope.options)
		promo.expireAt = new Date(promo.expireAt).toLocaleDateString('en-US', $scope.options)
		console.log(promo);
		return promo;
	})
	$rootScope.$on('newPromo', function(event, data) {
			console.log("this worked", data);
			data.createdAt = new Date(data.createdAt).toLocaleDateString('en-US', $scope.options)
			data.expireAt = new Date(data.expireAt).toLocaleDateString('en-US', $scope.options)
			$scope.promos.push(data);
		})
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