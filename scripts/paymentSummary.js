import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

export function renderPaymentSummary(){
    
    let totalPriceCents = 0;
    let numberOfItems = 0;
    let shippingCents = 0;
    cart.forEach((cartItem) => {
        const matchingProduct = products.find((product) => product.id === cartItem.productId);
        const priceCents = matchingProduct.priceCents;
        
        //first line
        totalPriceCents += cartItem.quantity * priceCents;
        numberOfItems += cartItem.quantity;

        //second line
        const matchingDeliveryOption = deliveryOptions.find((option) => cartItem.deliveryOptionId === option.id);

        shippingCents += matchingDeliveryOption.priceCents;
    })

    const totalBeforeTaxCents = totalPriceCents + shippingCents;
    const estimatedTaxCents = totalBeforeTaxCents * 0.1;
    const orderTotalCents = totalBeforeTaxCents + estimatedTaxCents;

    const html = `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${numberOfItems}):</div>
        <div class="payment-summary-money">$${(totalPriceCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${(shippingCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${(totalBeforeTaxCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${(estimatedTaxCents/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${(orderTotalCents/100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = html;

}