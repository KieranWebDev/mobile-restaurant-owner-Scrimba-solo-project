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
  itemID = Number(itemID);

  // get selected item
  const selectedItem = menuArray.filter((food) => food.id === itemID)[0];

  // check if the item is already in the cart
  const itemInCart = cart.find((item) => item.name === selectedItem.name);

  // if the item is already in the cart, increase its quantity by 1
  if (itemInCart) {
    itemInCart.quantity++;
  }
  // if the item is not in the cart, add it to the cart
  else {
    const itemForCart = {
      name: selectedItem.name,
      quantity: 1,
      price: selectedItem.price,
      id: selectedItem.id,
    };
    cart.push(itemForCart);
  }

  //   console.log(cart);
  renderCart(cart);
  return cart;
}

function removeFromCart(itemToRemove) {
  cart = cart.filter((item) => item.id !== Number(itemToRemove));
  renderCart(cart);
  return cart;
}

function renderCart(cart) {
  const shoppingCart = document.querySelector('#order-items-container');
  const shoppingCartSection = document.querySelector('#your-order-section');
  console.log(cart.length);

  shoppingCart.innerHTML = '';
  cart.length > 0
    ? shoppingCartSection.classList.remove('hidden')
    : shoppingCartSection.classList.add('hidden');

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

  document.querySelector('#total-price').textContent = `$${totalPrice}`;
}

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
  e.preventDefault();
  const formData = new FormData(form);

  const customerData = {
    name: formData.get('customerName'),
    cardNumber: formData.get('cardNumber'),
    customerCVV: formData.get('CVV'),
  };
  console.log(customerData);
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

    menuItems.classList.add('hidden');
    confirmMessage.classList.remove('hidden');
    confirmMessage.textContent = `Thanks, ${customerData.name}! Your order is on its way!`;
    document.querySelector('.btn').disabled = true;
    document.querySelectorAll('#remove-item-btn').forEach((button) => {
      button.disabled = true;
    });
    orderComplete = true;
  }, 3000);
  //   disableButtons();
  //   togglePaymentModal();

  //   shoppingCartSection.classList.add('hidden');
  //   confirmMessage.classList.remove('hidden');
  //   confirmMessage.textContent = `Thanks, ${customerData.name}! Your order is on its way!`;
}
// function disableButtons() {

// }
