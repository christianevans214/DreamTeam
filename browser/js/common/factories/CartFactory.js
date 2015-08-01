app.factory('CartFactory', function (AlbumFactory) {
	return {
		addAlbum: function(album, user){
			if(user.cart.length === 0) return user.cart.push({album: album, quantity: 1});
			var match = false;
			user.cart.forEach(function(cartItem, idx){
				console.log("idx:", idx, "album:", cartItem);
				if(cartItem.album === album._id) {
					cartItem.quantity++;
					match = true;
				}
			});
			if(!match) return user.cart.push({album: album, quantity: 1});
			console.log("user cart:", user.cart);
		},
		deleteAlbum: function(albumId, user){
			var index;
			user.cart.forEach(function(cartItem, idx){
				console.log("idx:", idx, "album:", cartItem);
				if(cartItem.album === albumId) {
					index = idx;
					return;
				}
			});
			user.cart.splice(index, 1);
		},
		updateQuantity: function(albumId, user, quantity){
			user.cart.forEach(function(cartItem, idx){
				if(cartItem.album === albumId) {
					cartItem.quantity = quantity;
				}
			});
		}
	}
})