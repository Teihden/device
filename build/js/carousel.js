// Carousel
const carousel = {
  productsList: document.querySelector('.slider .product-list'),
  slides: document.querySelectorAll('.product-list li'),
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
          const slideToRemove = this.productsList.firstElementChild;
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
      }, 0);

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

    setTimeout(() => {
      sliderButton.removeAttribute('disabled');
    }, this.transitionDuration);

    this.initAutoplay();
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
