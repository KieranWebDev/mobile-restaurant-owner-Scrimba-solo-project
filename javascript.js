import { menuArray } from './data.js';
// selectors
const menuItemsContainer = document.querySelector('#menu-items-container');

console.log(menuArray);

function render() {
  menuArray.forEach((item) => {
    let menuItem = ` <div class="menu-item">
    <img src="${item.image}" alt="pizza">
    <div class="menu-item-info">
        <h3 class="menu-item-name">${item.name}</h3>
        <p class="ingredients">${item.ingredients}</p>
        <p class="price">$${item.price}</p>
    </div>
    <button> + </button>
</div>`;
    menuItemsContainer.innerHTML += menuItem;
  });
}

render();
