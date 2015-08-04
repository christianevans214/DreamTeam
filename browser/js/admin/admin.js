app.config(function($stateProvider) {
	$stateProvider
		.state('admin', {
			url: '/admin',
			controller: "AdminController",
			templateUrl: "js/admin/admin.html",
			resolve: {
				user: function(AuthService) {
					return AuthService.getLoggedInUser();
				},
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

// app.run(function($rootScope, $state, AuthService) {
// 	var user = AuthService.getLoggedInUser();
// 	console.log(user);
// })

app.controller("AdminController", function($state, $rootScope, $scope, UserFactory, TransactionFactory, AlbumFactory, users, albums, artists, transactions, promos, user, ArtistFactory) {
	(function(user) {
		if (user && user.isAdmin) return;
		$state.go('home');
	})(user)
	$scope.users = users;
	$scope.albums = albums;
	$scope.artists = artists;
	$scope.transactions = transactions;
	$scope.options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: "numeric",
		minute: "numeric",
		second: "numeric"
	};
	$scope.promos = promos.map(function(promo) {
		promo.createdAt = new Date(promo.createdAt).toLocaleDateString('en-US', $scope.options)
		promo.expireAt = new Date(promo.expireAt).toLocaleDateString('en-US', $scope.options)
		return promo;
	})

	$rootScope.$on('deletedAlbum', function(event, id) {
		$scope.albums = $scope.albums.filter(function(album) {
			if (album._id === id) return false;
			return true;
		})
	})

	$rootScope.$on('deletedPromo', function(event, id) {
		$scope.promos = $scope.promos.filter(function(promo) {
			if (promo._id === id) return false;
			return true;
		})
	})
	$rootScope.$on('newPromo', function(event, data) {
		data.createdAt = new Date(data.createdAt).toLocaleDateString('en-US', $scope.options)
		data.expireAt = new Date(data.expireAt).toLocaleDateString('en-US', $scope.options)
		promos.push(data);
		$scope.promos.push(data);
	})
	$rootScope.$on('newAlbum', function(event, data) {
			ArtistFactory.getArtist(data.artist)
				.then(function(artistInfo) {
					data.artist = artistInfo
					$scope.albums.push(data);
				})
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
				$state.go('admin.userManagement')
			})
	}
})