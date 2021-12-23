export const mainSlider = (selector) => {
  const slider = document.querySelector(selector);
  if (slider) {
    const sliderList = slider.querySelector('.slider-list');
    const sliderTrack = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slide');
    const arrows = slider.querySelector('.slider-arrows');
    const prev = arrows.children[0];
    const next = arrows.children[1];
    const itemWidth = slides[0].offsetWidth;
    let slideIndex = 0;
    const movePosition = sliderList.offsetWidth;
    const slidesToShow = Math.floor(movePosition / itemWidth);
    const countItems = slides.length;
    const borderToSlide = (countItems - (slidesToShow + 1)) * itemWidth + itemWidth - (movePosition - itemWidth * slidesToShow);
    slideIndex = 3;
    const toSlide = itemWidth * 3;
    sliderTrack.style.transform = `translate3d(-${toSlide}px, 0px, 0px)`;
    prev.classList.toggle('disabled', slideIndex === 0);
    next.classList.toggle('disabled', slideIndex >= countItems - slidesToShow);

    if (arrows && prev && next) {
      arrows.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('main-slider__button_right') || target.classList.contains('main-slider__arrow_right')) {
          next.classList.add('main-slider__button_block');
          setTimeout(async () => {
            next.classList.remove('main-slider__button_block');
          }, 500);
          slideIndex++;
        } else if (target.classList.contains('main-slider__button_left') || target.classList.contains('main-slider__arrow_left')) {
          prev.classList.add('main-slider__button_block');
          setTimeout(async () => {
            prev.classList.remove('main-slider__button_block');
          }, 500);
          slideIndex--;
        } else {
          return;
        }
        slide();
      });
    }

    const slide = () => {
      if (sliderTrack) {
        sliderTrack.style.transition = 'transform .5s';

        if (slideIndex < 0) {
          slideIndex = 0;
        }
        let slideWidth = slideIndex * itemWidth > borderToSlide ? borderToSlide : slideIndex * itemWidth;

        sliderTrack.style.transform = `translate3d(-${slideWidth}px, 0px, 0px)`;

        if (slideIndex === countItems - 2 || slideIndex === 1) {
          if (slideIndex === countItems - 2) {
            slideIndex = 2;
          }
          if (slideIndex === 1) {
            slideIndex = countItems - 3;
          }
          setTimeout(async () => {
            sliderTrack.style.transition = 'transform .0s';
            slideWidth = slideIndex * itemWidth;
            sliderTrack.style.transform = `translate3d(-${slideWidth}px, 0px, 0px)`;
          }, 500);
        }
        prev.classList.toggle('disabled', slideIndex === 0);
        next.classList.toggle('disabled', slideIndex >= countItems - slidesToShow);
        stopAnimation();
      }
    };

    const getEvent = () => {
      return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    };

    // let transition = true;
    let posInit = 0;
    let posX1 = 0;
    let posX2 = 0;
    let posY1 = 0;
    let posY2 = 0;
    let posFinal = 0;
    let isSwipe = false;
    let isScroll = false;
    let allowSwipe = true;
    // let nextTrf = 0;
    // let prevTrf = 0;
    const posThreshold = slides[0].offsetWidth * 0.35;
    const trfRegExp = /([-0-9.]+(?=px))/;
    const swipeStart = () => {
      const evt = getEvent();
      if (allowSwipe) {
        // transition = true;
        // nextTrf = (slideIndex + 1) * -itemWidth;
        // prevTrf = (slideIndex - 1) * -itemWidth;
        posInit = posX1 = evt.clientX;
        posY1 = evt.clientY;
        sliderTrack.style.transition = '';

        slider.addEventListener('touchmove', function(e) {
          swipeAction(e);
        }, false);
        slider.addEventListener('touchend', swipeEnd);
        sliderList.classList.remove('grab');
        sliderList.classList.add('grabbing');
      }
    };
    const swipeAction = (e) => {
      e.preventDefault();
      e.stopPropagation();
      allowSwipe = true;
      const evt = getEvent();
      const style = sliderTrack.style.transform;
      const transform = +style.match(trfRegExp)[0];
      posX2 = posX1 - evt.clientX;
      posX1 = evt.clientX;
      posY2 = posY1 - evt.clientY;
      posY1 = evt.clientY;
      if (!isSwipe && !isScroll) {
        const posY = Math.abs(posY2);
        if (posY > 7 || posX2 === 0) {
          isScroll = true;
          allowSwipe = false;
        } else if (posY < 7) {
          isSwipe = true;
        }
      }
      if (isSwipe) {
        sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
      }
    };

    const swipeEnd = () => {
      posFinal = posInit - posX1;
      isSwipe = false;
      slider.removeEventListener('touchmove', swipeAction);
      slider.removeEventListener('touchend', swipeEnd);
      if (allowSwipe) {
        if (Math.abs(posFinal) > posThreshold) {
          if (posInit < posX1) {
            slideIndex--;
          } else if (posInit > posX1) {
            slideIndex++;
          }
        }
        if (posInit !== posX1) {
          slide();
        }
      }
    };

    let isAnimating = false;
    const stopAnimation = () => {
      setTimeout(() => {
        isAnimating = false;
      }, 500);
    };

    slider.addEventListener('wheel', (event) => {
      if (isAnimating) {
        event.preventDefault();
        return;
      }
      const direction = event.deltaX;
      if (direction > 0) {
        event.preventDefault();
        slideIndex ++;
        isAnimating = true;
        slide();
      } else if (direction < 0) {
        event.preventDefault();
        slideIndex --;
        isAnimating = true;
        slide();
      }
    },
    {passive: false},
    );
    sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
    slider.addEventListener('touchstart', swipeStart);
  }
};
