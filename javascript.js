import { menuArray } from './data.js';

// selectors
const menuItemsContainer = document.querySelector('#menu-items-container');

let cart = [];

// console.log(menuArray);
document.addEventListener('click', (e) => {
  if (e.target.dataset.addToCart) {
    addToCart(e.target.dataset.addToCart);
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
    <button data-add-to-cart= ${item.id}> + </button>
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
    };
    cart.push(itemForCart);
  }

  console.log(cart);
  renderCart(cart);
}

function renderCart(cart) {
  const shoppingCart = document.querySelector('#order-items-container');
  const ShoppingCartSection = document.querySelector('#your-order-section');

  shoppingCart.innerHTML = '';
  cart.length > 0
    ? ShoppingCartSection.classList.remove('hidden')
    : ShoppingCartSection.classList.add('hidden');

  let totalPrice = 0;

  cart.forEach((item) => {
    let cartItem = `
  <div class="order-item">
      <p class="item-name">${item.name} ${
      item.quantity > 1 ? `(x${item.quantity})` : ''
    }</p>
      <button id="remove-item-btn" class="remove-item-btn">remove</button>
      <p class="item-price">$${item.price * item.quantity}</p>
  </div>`;

    totalPrice += item.price * item.quantity;
    shoppingCart.innerHTML += cartItem;
  });
  console.log(totalPrice);
  document.querySelector('#total-price').textContent = `$${totalPrice}`;
}
