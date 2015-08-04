app.config(function($stateProvider) {
	$stateProvider.state('admin.promoManagement', {
		url: '/promoManagement',
		templateUrl: 'js/admin/substates/promoManagement/promoManagement.html',
		controller: 'PromoManagementController'
	})
})

app.controller('PromoManagementController', function($rootScope, $scope, PromotionsFactory) {
	$scope.deleteAlbum = function(id) {
		//front-end deletion of $scope.albums
		$rootScope.$broadcast('deletedPromo', id)
			// $scope.albums = $scope.albums.filter(function(album) {
			// 	if (album._id === id) return false;
			// 	return true;
			// })
			// albums = albums.filter(function(album) {
			// 		if (album._id === id) return false;
			// 		return true;
			// 	})
			//DB deletion of albums
		PromotionsFactory.deletePromotion(id)
			.then(function(response) {
				console.log(response);
			})
	}
})