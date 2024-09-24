import {cart, removeFromCart, saveToLocalStorage, updateCartQuantity, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';

let cartItemsHTML = '';
cart.forEach((cartItem) => {
    const product = products.find((product) => product.id === cartItem.productId);

    const html = `
        <div class="cart-item-container js-cart-item-container-${product.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${(product.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${product.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" 
                  data-product-id="${product.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${product.id}">
                  <span class="save-quantity-link link-primary js-save-quantity-link"
                  data-product-id="${product.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    `;
    cartItemsHTML += html;
});

document.querySelector('.js-order-summary').innerHTML = cartItemsHTML;

//delete link
document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    
    //remove the product from cart array
    removeFromCart(link.dataset.productId);

    //update the html
    document.querySelector(`.js-cart-item-container-${link.dataset.productId}`).remove();
    updateCartQuantity('checkout');

  })
})

//number of items in header of page
updateCartQuantity('checkout');

//update link
document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const container = document.querySelector(`.js-cart-item-container-${link.dataset.productId}`);

    container.classList.add('is-editing-quantity');
  })
})

function savingUpdate(){
  const container = document.querySelector(`.js-cart-item-container-${link.dataset.productId}`);

    container.classList.remove('is-editing-quantity');

    //saving the new value
    const newQuantity = +document.querySelector(`.js-quantity-input-${link.dataset.productId}`).value;

    //update the cart array, and localStorage
    updateQuantity(link.dataset.productId, newQuantity);

    //updating html (in header and quantity-label)
    updateCartQuantity('checkout');

    document.querySelector(`.js-quantity-label-${link.dataset.productId}`).innerHTML = newQuantity;
}

//reversing the update
document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    savingUpdate();
  })
})

//on pressing key Enter


