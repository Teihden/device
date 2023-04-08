// Shopping-cart
const shoppingCart = document.getElementById('shopping-cart');
const cartItems = shoppingCart.querySelectorAll(':scope .cart-item');

function closeCartItemEvent(e) {
  const cartItem = e.currentTarget;
  const priceItem = +cartItem.dataset.price;
  const elementTrigger = e.target;

  if (!elementTrigger.classList.contains('cart-button-close')) {
    return;
  }

  const cartOutputPrice = document.querySelector('.cart-output-price');
  const outputPrice = +cartOutputPrice.textContent.split(' ')[0];
  const resultOutputPrice = outputPrice - priceItem;

  const cartsOutputQuantity = document.querySelectorAll('.cart-output-quantity');
  for (let i = 0; i < cartsOutputQuantity.length; i += 1) {
    cartsOutputQuantity[i].textContent -= 1;
  }

  cartOutputPrice.textContent = `${resultOutputPrice} ₽`;
  cartItem.remove();
}

for (let i = 0; i < cartItems.length; i += 1) {
  cartItems[i].addEventListener('click', closeCartItemEvent);
}

// Features-tabs
const tabs = document.querySelector('.tabs');
const tabsButtons = tabs.querySelectorAll(':scope button');

function openTabEvent() {
  const tabActiveButton = tabs.querySelector(':scope button.tab-active');
  const idFeatureToOpen = this.dataset.item;
  const idFeatureToClose = tabActiveButton.dataset.item;
  const featureItemToOpen = document.getElementById(idFeatureToOpen);
  const featureItemToClose = document.getElementById(idFeatureToClose);

  tabActiveButton.classList.remove('tab-active');
  featureItemToClose.classList.add('closed');
  this.classList.add('tab-active');
  featureItemToOpen.classList.remove('closed');
}

for (let i = 0; i < tabsButtons.length; i += 1) {
  tabsButtons[i].addEventListener('click', openTabEvent);
}
