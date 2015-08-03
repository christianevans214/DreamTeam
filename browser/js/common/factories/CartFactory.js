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
			cart.forEach(function(cartItem, idx){
				console.log("idx:", idx, "cartItem:", cartItem);
				if(cartItem.album._id === album._id) {
					index = idx;
					return;
				}
			});
			cart.splice(index, 1);
			return index;
		}
	}
})