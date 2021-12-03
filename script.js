const menu = document.querySelector(".navigation");
const menuLink = document.querySelectorAll(".nav-link");
const logoAnchor = document.querySelectorAll(".logo-link");
const checkBox = document.querySelector("#hamburger-check");
const headerBtns = document.querySelector('.header-buttons')



function clearURL() {
  window.history.replaceState({}, document.title, "/");
}

menu.addEventListener('click',scrollSection.bind(1))
headerBtns.addEventListener('click',scrollSection.bind(1))
logoAnchor.forEach(el=>el.addEventListener('click',scrollSection.bind(1)))


function scrollSection(e){
  if(!e.target.closest('a').classList.contains('scroll')) return;
  e.preventDefault();
  const id = e.target.closest('a').getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  menuClose(e);
  if(e.target.closest('a').classList.contains('home-logo')){
    setTimeout(clearURL(),0)
  } 
}

function menuClose(e) {
  checkBox.checked ? checkBox.click() : null;
}

////////////////////////////////
// SLIDER

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();