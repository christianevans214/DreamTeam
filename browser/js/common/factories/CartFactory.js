app.factory('CartFactory', function () {
	return {
		addAlbum: function(albumToAddToCart, user){
			//if nothing in cart, push album to cart
			if(user.cart.length === 0) return user.cart.push({album: albumToAddToCart, quantity: 1});
			var match = false;
			user.cart.forEach(function(cartItem){
				//if album already in cart, increase quantity
				if(cartItem.album === albumToAddToCart._id) {
					cartItem.quantity++;
					match = true;
				}
			});
			//if album not in cart, push album to cart
			if(!match) user.cart.push({album: albumToAddToCart, quantity: 1});
		},
		deleteAlbum: function(albumToDelete, cart){
			var index;
			cart.forEach(function(cartItem, idx){
				// console.log("idx:", idx, "cartItem:", cartItem);
				if(cartItem.album === albumToDelete._id) {
					index = idx;
					return;
				}
			});
			cart.splice(index, 1);
		},
		updateQuantity: function(albumToUpdate, user, quantity){
			user.cart.forEach(function(cartItem, idx){
				if(cartItem.album === albumToUpdate._id) {
					user.cart[idx].quantity = quantity;
					return;
				}
			});
		}
	}
})