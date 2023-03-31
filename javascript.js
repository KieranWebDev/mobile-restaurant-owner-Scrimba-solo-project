import { menuArray } from './data.js';

// selectors
const menuItemsContainer = document.querySelector('#menu-items-container');

let cart = [];

document.addEventListener('click', (e) => {
  if (e.target.dataset.addToCart) {
    addToCart(e.target.dataset.addToCart);
  } else if (e.target.dataset.removeItem) {
    removeFromCart(e.target.dataset.removeItem);
  } else if (e.target.id === 'complete-order-btn') {
    togglePaymentModal();
  }
});

function renderMenu() {
  // Loop through the menuArray and create an HTML string for each item, which includes its name, image, ingredients, and price
  menuArray.forEach((item) => {
    let menuItem = ` <div class="menu-item">
    <img src="${item.image}" alt="pizza">
    <div class="menu-item-info">
        <h3 class="menu-item-name">${item.name}</h3>
        <p class="ingredients">${item.ingredients}</p>
        <p class="price">$${item.price}</p>
    </div>
    <button id='add-to-cart-btn' data-add-to-cart= ${item.id}> + </button>
</div>`;
    menuItemsContainer.innerHTML += menuItem;
  });
}

renderMenu();

function addToCart(itemID) {
  // Convert the itemID to a number and find the corresponding menu item in the menuArray
  itemID = Number(itemID);
  const selectedItem = menuArray.filter((food) => food.id === itemID)[0];

  // Check if the selected item is already in the cart; if so, increment its quantity, otherwise add it to the cart
  const itemInCart = cart.find((item) => item.name === selectedItem.name);
  if (itemInCart) {
    itemInCart.quantity++;
  } else {
    const cartItem = {
      name: selectedItem.name,
      quantity: 1,
      price: selectedItem.price,
      id: selectedItem.id,
    };
    cart.push(cartItem);
  }
  // Render the updated cart
  renderCart(cart);
  return cart;
}

function removeFromCart(itemToRemove) {
  cart = cart.filter((item) => item.id !== Number(itemToRemove));
  renderCart(cart);
  return cart;
}

function renderCart(cart) {
  // Get the shopping cart container and the section that shows the cart total
  const shoppingCart = document.querySelector('#order-items-container');
  const shoppingCartSection = document.querySelector('#your-order-section');

  // Clear the shopping cart and hide the section if there are no items in the cart
  shoppingCart.innerHTML = '';
  cart.length > 0
    ? shoppingCartSection.classList.remove('hidden')
    : shoppingCartSection.classList.add('hidden');

  // Loop through the cart items and create an HTML string for each one, which includes its name, quantity, price, and a remove button
  let totalPrice = 0;
  cart.forEach((item) => {
    let cartItem = `
  <div class="order-item">
      <p class="item-name">${item.name} ${
      item.quantity > 1 ? `(x${item.quantity})` : ''
    }</p>
      <button data-remove-item = ${
        item.id
      } id="remove-item-btn" class="remove-item-btn">remove</button>
      <p class="item-price">$${item.price * item.quantity}</p>
  </div>`;

    totalPrice += item.price * item.quantity;
    shoppingCart.innerHTML += cartItem;
  });
  // Display the total price of all items in the cart
  document.querySelector('#total-price').textContent = `$${totalPrice}`;
}

// modal / complete order logic
document.querySelector('#modal-close').addEventListener('click', () => {
  document.querySelector('#modal-overlay').classList.toggle('hidden');
  document.querySelector('#modal').classList.toggle('hidden');
});

function togglePaymentModal() {
  document.querySelector('#modal').classList.toggle('hidden');
  document.querySelector('#modal-overlay').classList.toggle('hidden');
}

const form = document.querySelector('form');

form.addEventListener('submit', makepayment);

function makepayment(e) {
  // Prevent the form from submitting normally
  e.preventDefault();

  // Get the form data and create an object with the customer's name, card number, and CVV
  const formData = new FormData(form);
  const customerData = {
    name: formData.get('customerName'),
    cardNumber: formData.get('cardNumber'),
    customerCVV: formData.get('CVV'),
  };

  // Display a message indicating that the order is being processed
  orderCompleteMessage(customerData);
}

function orderCompleteMessage(customerData) {
  const menuItems = document.querySelector('#menu-items-container');
  const confirmMessage = document.querySelector('#confirm-message');
  const modal = document.querySelector('#modal');
  modal.innerHTML = `<img src="./images/833.svg" alt="">
  <h1>Processing your order</h1>`;

  setTimeout(() => {
    togglePaymentModal();
    // after 3 seconds, hide the menu items container and show the confirmation message
    menuItems.classList.add('hidden');
    confirmMessage.classList.remove('hidden');

    // display the confirmation message with the customer's name and
    confirmMessage.textContent = `Thanks, ${customerData.name}! Your order is on its way!`;

    // Disable the checkout button and all 'remove item' buttons
    document.querySelector('.btn').disabled = true;
    document.querySelectorAll('#remove-item-btn').forEach((button) => {
      button.disabled = true;
    });
    orderComplete = true;
  }, 3000);
}
