app.config(function($stateProvider){
  $stateProvider
  .state('checkout', {
    url: '/transaction',
    controller: 'CheckoutController',
    templateUrl: 'js/checkout/checkout.html',
    resolve: {
      user: function(AuthService){
        return AuthService.getLoggedInUser();
      }
    }
  })
})

app.controller('CheckoutController', function($state, $scope, user, TransactionFactory, localStorageService, UserFactory, PromotionsFactory, CartFactory){
  $scope.user = user;
  $scope.purchases = [];
  $scope.savings = 0;

  //set default of country to us:
  $scope.defaultCountry = "United States";

  if($scope.user){
    $scope.cartItems = localStorageService.get('userCart');
  } 
  else $scope.cartItems = localStorageService.get('cart');

  $scope.cartItems.forEach(function(item){
    $scope.purchases.push({album: item.album, price: item.album.price, quantity: item.quantity})
  })


  $scope.getGenres = function(genresArr){
    return genresArr[0].split(' ');
  }

  $scope.applyPromo = function(promoCode, purchase){
    console.log("purchase", purchase, promoCode)
    purchase.price = purchase.album.price*(1-promoCode.percentageOff);
    $scope.savings += (purchase.album.price - purchase.price);
    return purchase;
  }


  $scope.checkPromo = function(promo){
    console.log("PROMO", promo);
    $scope.valid = false;
    PromotionsFactory.getAllPromotions()
    .then(function(validPromos){
      $scope.valid = validPromos.filter(function(validPromo){
        return (promo.toLowerCase() === validPromo.code.toLowerCase() && (new Date(validPromos[0].expireAt) - new Date()) > 0);
      })

      if($scope.valid.length === 1){
        $scope.purchases.forEach(function(item){
          console.log("purchase items", item, $scope.valid)
          var genres = $scope.getGenres(item.album.genre)
          for(var i = 0; i < genres.length; i++){
            if($scope.valid[0].validProducts.indexOf(genres[i]) > -1){
              $scope.applyPromo($scope.valid[0], item);
            }
          }
          //set cartItems to updated purchases for html form
          $scope.cartItems = $scope.purchases;
        })
        console.log("cartItems", $scope.cartItems)
        console.log("purchases", $scope.purchases);
        //$scope.cartItems = $scope.purchases;
      }
    })

    //IF PROMO IS EXPIRED REMOVE FROM DATABASE!
    if((new Date(validPromos[0].expireAt) - new Date()) < 0){
      PromotionsFactory.deletePromotion($scope.valid[0]._id)
    }
  }

  //UPDATE QUANTITY
  $scope.totalPrice = CartFactory.sumPrice($scope.cartItems);

  //when place order is clicked -> make post request with form data for user and guest
  $scope.submitCheckout = function(orderData){
    orderData.purchases = $scope.purchases;
    orderData.user = $scope.user;
    orderData.promo = $scope.valid[0]._id;
    if(orderData.shippingMatch){
      orderData.billing = orderData.shipping;
    }
    console.log("FINAL ORDER DATA", orderData)
    TransactionFactory.submitTransaction(orderData)
    .then(function(order){
      //update user to store in their transaction history
      if($scope.user){
        if($scope.user.purchaseHistory) $scope.user.purchaseHistory.push(order);
        else $scope.user.purchaseHistory = [order];  
        UserFactory.updateUser($scope.user._id, $scope.user);
      }
      return order;
    })
    .then(function(order){
      console.log('order', order);
      $scope.sendEmail(order);
      return order;
    })
    .then(function(){
      //delete local storage
      localStorageService.remove('cart', 'userCart');
      $state.go('account.shoppingHistory', {id: user._id});
    })
  }

  //send conformation email
  $scope.sendEmail = function(order){
    console.log('sendEmailOrder', order);
    TransactionFactory.emailTransaction(order);
  }
})













