import {cart, removeFromCart, saveToLocalStorage, updateCartQuantity, updateDeliveryOption, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
// import '../data/cart-class.js';
import '../data/backend-practice.js';
import { loadProducts } from '../data/products.js';

async function loadPage(){
  try {
    await loadProducts();

    renderOrderSummary();
    renderPaymentSummary();
  } catch(error){
    console.log(error);
  }
}

loadPage();


export function renderOrderSummary(){
  let cartItemsHTML = '';
  cart.forEach((cartItem) => {
      const product = products.find((product) => product.id === cartItem.productId);

      const matchingDeliveryOption = deliveryOptions.find((option) => option.id === cartItem.deliveryOptionId);

      const dateString = dayjs().add(matchingDeliveryOption.deliveryDays, 'day').format('dddd, MMMM D');

      const html = `
          <div class="cart-item-container js-cart-item-container-${product.id}">
              <div class="delivery-date js-delivery-date-${product.id}">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${product.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${product.name}
                  </div>
                  <div class="product-price">
                    $${product.formatedPrice()}
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
                  ${deliveryOptionsHTML(product.id, cartItem)}
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

      //update the payment summary
      renderPaymentSummary();

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

  //reversing the update
  document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const container = document.querySelector(`.js-cart-item-container-${link.dataset.productId}`);

      container.classList.remove('is-editing-quantity');

      //saving the new value
      const newQuantity = +document.querySelector(`.js-quantity-input-${link.dataset.productId}`).value;

      //update the cart array, and localStorage
      updateQuantity(link.dataset.productId, newQuantity);

      //updating html (in header and quantity-label)
      updateCartQuantity('checkout');

      document.querySelector(`.js-quantity-label-${link.dataset.productId}`).innerHTML = newQuantity;

      //update the payment summary
      renderPaymentSummary();
    })
  })


  function deliveryOptionsHTML(productId, cartItem){
    let html = '';
    deliveryOptions.forEach((option) => {
      const dateString = dayjs().add(option.deliveryDays, 'day').format('dddd, MMMM D');

      const priceString = option.priceCents === 0 ? 'FREE Shipping' : `$${(option.priceCents/100).toFixed(2)} - Shipping`;

      const isChecked = cartItem.deliveryOptionId === option.id;

      html += `
        <div class="delivery-option js-delivery-option"
        data-product-id="${productId}" data-delivery-option-id="${option.id}">
          <input type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString}
            </div>
          </div>
        </div>
    `;
    })
    return html;
  }

  //updating the delivery options
  document.querySelectorAll('.js-delivery-option').forEach((div) => {
    div.addEventListener('click', () => {
      const {productId, deliveryOptionId} = div.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      //updating the main delivery date of the cart item
      renderOrderSummary();

      //update the payment summary
      renderPaymentSummary();
    })
  })
}

// renderOrderSummary();

//payment summary
// renderPaymentSummary();