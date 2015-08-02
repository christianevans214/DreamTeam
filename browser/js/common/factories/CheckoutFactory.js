app.factory("CheckoutFactory", function($http) {
  return {
   //on submit order post transaction in checkout.js
   submitTransaction: function(data){
    return $http.post('/api/transaction', data)
        .then(function(res) {
          return res.data
        })
   },
   getTransaction: function(){
    return $http.get('/api/transaction')
        .then(function(res) {
          return res.data
        })
   }

  }
})