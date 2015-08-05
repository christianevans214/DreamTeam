app.factory('CartFactory', function () {
	return {
		addAlbum: function(album, cart){
			console.log('cart', cart);
			if(cart.length === 0) return cart.push({album: album, quantity: 1});
			var match = false;
			cart.forEach(function(cartItem){
				if(cartItem.album._id === album._id) {
					cartItem.quantity++;
					match = true;
				}
			});
			if(!match) return cart.push({album: album, quantity: 1});
		},
		deleteAlbum: function(album, cart){
			var index;
 			user.cart.forEach(function(cartItem, idx){
				// console.log("idx:", idx, "cartItem:", cartItem);
				// console.log('album', album);
				if(cartItem.album === album._id) {
					index = idx;
					return;
				}
			});
			return index;
		},
		sumPrice: function(cart){
			var sum = 0;
			cart.forEach(function(cartItem){
				sum += cartItem.album.price*cartItem.quantity;
			})
			return sum;
		}
	}
})