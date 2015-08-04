app.config(function($stateProvider) {
	$stateProvider
		.state("admin.newPromo", {
			url: '/promoManagement/newPromo',
			templateUrl: 'js/admin/substates/promoManagement/NewPromoView/NewPromoView.html',
			controller: "NewPromoController"
		})
})

app.controller("NewPromoController", function($rootScope, $scope, PromotionsFactory, promos, $state) {
	$scope.newPromo = {
		expireString: "24",
		validGenres: {}
	};
	$scope.makePromo = function(newPromoInfo) {
		newPromoInfo.percentageOff = Number(newPromoInfo.percentageOff);

		PromotionsFactory.createPromotion(newPromoInfo)
			.then(function(data) {
				console.log(data)
				$rootScope.$broadcast("newPromo", data);
				// promos.push(data);
				$state.go('admin.promoManagement')
			})
			.then(null, function(err) {
				$scope.duplicate = true;
			})
	}
})