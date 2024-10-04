export const orders = JSON.parse( localStorage.getItem('orders') ) || [];

export function addOrder(orderObject){
    orders.unshift(orderObject);
    saveToLocalStorage();
}

function saveToLocalStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}