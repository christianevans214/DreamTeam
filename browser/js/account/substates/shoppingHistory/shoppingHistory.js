app.config(function($stateProvider){
  $stateProvider.state('account.shoppingHistory', {
    url: '/shoppingHistory',
    templateUrl: 'js/account/substates/shoppingHistory/shoppingHistory.html',
    controller: 'shoppingHistController',
    resolve: {
      user: function(UserFactory, $stateParams) {
        return UserFactory.getUser($stateParams.id);
      }
    }
  })
})

app.controller('shoppingHistController', function($scope, user, TransactionFactory, AlbumFactory){
  console.log('user', user);

  $scope.allTransactions = []; 

  $scope.getShopHistory = function(){
    var indexPurchase = 0;
    user.purchaseHistory.forEach(function(transactionId, ind){
      TransactionFactory.getTransaction(transactionId)
      .then(function(transaction){
        return transaction
      })
      .then(function(transaction){
        transaction.purchases.forEach(function(purchase, ind){
          AlbumFactory.getAlbum(purchase.album)
          .then(function(album){
            transaction.purchases[ind].album = album;
          })
        })
        return transaction;
      })
      .then(function(transaction){
        $scope.allTransactions.push(transaction);
      })
  });
 };
  $scope.getShopHistory();
})