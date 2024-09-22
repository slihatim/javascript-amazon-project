export let cart = JSON.parse( localStorage.getItem('cart') ) || [];

export function removeFromCart(productId){
    cart = cart.filter((cartItem) => cartItem.productId !== productId);

    saveToLocalStorage();
}

export function saveToLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}