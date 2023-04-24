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

// Catalog-menu
const catalogAnchor = document.querySelector('.catalog-heading');
const catalogList = document.querySelector('.catalog-list');

catalogAnchor.addEventListener('click', () => {
  if (catalogList.classList.contains('catalog-list-opened')) {
    catalogList.classList.remove('catalog-list-opened');
  } else {
    catalogList.classList.add('catalog-list-opened');
  }
});

catalogList.addEventListener('keyup', (e) => {
  if (e.keyCode === 9 && catalogList.contains(e.target)) {
    if (!catalogList.classList.contains('catalog-list-opened')) {
      catalogList.classList.add('catalog-list-opened');
    }
  }
});

catalogList.addEventListener('focusout', (e) => {
  if (!catalogList.contains(e.relatedTarget)) {
    catalogList.classList.remove('catalog-list-opened');
  }
});

// Modal
const anchors = document.querySelectorAll("[href='#modal']");
const modal = document.getElementById('modal');
const modalInner = document.querySelector('.modal-inner');
const modalButtonClose = document.querySelector('.modal-button-close');

anchors.forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();

    if (!modal.classList.contains('modal-opened')) {
      modal.classList.add('modal-opened');
    }
  });
});

modalButtonClose.addEventListener('click', () => {
  if (modal.classList.contains('modal-opened')) {
    modal.classList.remove('modal-opened');
  }
});

modal.addEventListener('click', (e) => {
  if (modal.classList.contains('modal-opened') && !modalInner.contains(e.target)) {
    modal.classList.remove('modal-opened');
  }
});
