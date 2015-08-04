app.config(function($stateProvider) {
	$stateProvider
		.state("admin.editPromo", {
			url: '/promoManagement/editPromo/:id',
			templateUrl: 'js/admin/substates/promoManagement/EditPromoView/EditPromoView.html',
			controller: "EditPromoController"
		})
})

app.controller("EditPromoController", function($rootScope, $scope, PromotionsFactory, promos, $state, $stateParams) {
	console.log("PROMOS", promos);
	// console.log("EHY");
	// console.log($stateParams.id);
	$scope.updatedPromo = promos.filter(function(promo) {
		if (promo._id === $stateParams.id) return true;
	})[0]
	$scope.updatePromo = function(promoInfo) {
		// console.log("uh? why no work?");
		promoInfo.percentageOff = Number(promoInfo.percentageOff);
		PromotionsFactory.updatePromotion(promoInfo._id, promoInfo)
			.then(function(updatedPromo) {
				$scope.updatedPromo = updatedPromo;
				$state.go("admin.promoManagement");
			})
	}
})