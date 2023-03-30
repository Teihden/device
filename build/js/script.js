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

// Carousel
const carousel = {
  productsList: document.querySelector('.slider .products-list'),
  slides: document.querySelectorAll('.products-list li'),
  buttonNext: document.querySelector('.slider .button-next'),
  buttonPrevious: document.querySelector('.slider .button-previous'),
  articles: document.querySelectorAll('.articles li'),
  buttonsDot: document.querySelectorAll('.hero-buttons .slide-button'),
  activeIndex: 0,
  maxIndex: 2,
  minIndex: 0,
  transitionDuration: 500,
  transitionDelay: 0,
  transitionTimingFunction: 'linear',
  intervalID: null,
  autoplayDelay: 5000,

  goToSlide(numberOfSlidesToMove) {
    let newActiveIndex = 0;
    const transition = `transform ${this.transitionDuration}ms ${this.transitionTimingFunction} ${this.transitionDelay}ms`;

    if (this.activeIndex + numberOfSlidesToMove > this.maxIndex) {
      newActiveIndex = 0;
    } else if (this.activeIndex + numberOfSlidesToMove < this.minIndex) {
      newActiveIndex = this.maxIndex;
    } else {
      newActiveIndex = this.activeIndex + numberOfSlidesToMove;
    }

    if (this.activeIndex + numberOfSlidesToMove > this.maxIndex) {
      for (let i = this.minIndex; i <= this.maxIndex; i += 1) {
        const slideToReplace = this.productsList.children[i].cloneNode(true);
        this.productsList.appendChild(slideToReplace);
      }

      const positionX = (this.maxIndex + 1) * 560;
      this.productsList.style.transition = transition;
      this.productsList.style.transform = `translateX(-${positionX}px)`;

      setTimeout(() => {
        for (let i = this.minIndex; i <= this.maxIndex; i += 1) {
          const slideToRemove = this.productsList.children[0];
          this.productsList.removeChild(slideToRemove);
        }

        this.productsList.style.transition = null;
        this.productsList.style.transform = null;
      }, this.transitionDuration);
    } else if (this.activeIndex + numberOfSlidesToMove < this.minIndex) {
      for (let i = this.minIndex; i <= this.maxIndex; i += 1) {
        const slideToReplace = this.productsList.children[this.maxIndex].cloneNode(true);
        this.productsList.insertBefore(slideToReplace, this.productsList.firstElementChild);
      }

      let positionX = (this.maxIndex + 1) * 560;
      this.productsList.style.transition = null;
      this.productsList.style.transform = `translateX(-${positionX}px)`;

      setTimeout(() => {
        positionX = this.maxIndex * 560;
        this.productsList.style.transition = transition;
        this.productsList.style.transform = `translateX(-${positionX}px)`;
      }, 1);

      setTimeout(() => {
        for (let i = this.minIndex; i <= this.maxIndex; i += 1) {
          const slideToRemove = this.productsList.lastElementChild;
          this.productsList.removeChild(slideToRemove);
        }
      }, this.transitionDuration);
    } else {
      const positionX = newActiveIndex * 560;
      this.productsList.style.transition = transition;
      this.productsList.style.transform = `translateX(-${positionX}px)`;
    }

    const activeDot = document.getElementById(`button-${this.activeIndex}`);
    const activeArticle = document.getElementById(`article-${this.activeIndex}`);

    activeDot.classList.remove('slide-button-active');
    activeArticle.classList.add('closed');
    this.activeIndex = newActiveIndex;

    const newActiveDot = document.getElementById(`button-${this.activeIndex}`);
    const newActiveArticle = document.getElementById(`article-${this.activeIndex}`);

    newActiveDot.classList.add('slide-button-active');
    newActiveArticle.classList.remove('closed');
  },

  initAutoplay() {
    this.intervalID = setInterval(() => this.goToSlide(1), this.autoplayDelay);
  },

  sliderButtonEvent(e, numberOfSlidesToMove) {
    const sliderButton = e.target;

    sliderButton.setAttribute('disabled', '');
    clearInterval(this.intervalID);
    this.goToSlide(numberOfSlidesToMove);
    this.initAutoplay();

    setTimeout(() => {
      sliderButton.removeAttribute('disabled');
    }, this.transitionDuration);
  },

  init() {
    this.buttonNext.addEventListener('click', (e) => {
      this.sliderButtonEvent(e, 1);
    });

    this.buttonPrevious.addEventListener('click', (e) => {
      this.sliderButtonEvent(e, -1);
    });

    for (let i = 0; i < this.buttonsDot.length; i += 1) {
      this.buttonsDot[i].addEventListener('click', (e) => {
        const buttonDot = e.target;
        const sequenceNumberOfButton = buttonDot.id.split('-').at(-1);
        const numberOfSlidesToMove = sequenceNumberOfButton - this.activeIndex;

        clearInterval(this.intervalID);
        this.goToSlide(numberOfSlidesToMove);
        this.initAutoplay();
      });
    }

    this.initAutoplay();
  },
};

window.addEventListener('load', () => carousel.init());

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
