export const slider = (selector) => {
  const slider = document.querySelector(selector);
  if (slider) {
    const sliderList = slider.querySelector('.slider-list');
    const sliderTrack = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slide');
    const arrows = slider.querySelector('.slider-arrows');
    const prev = arrows.children[0];
    const next = arrows.children[1];
    let widthSlide = 0;
    const itemWidth = slides[0].offsetWidth;

    let slideIndex = 0;
    const movePosition = sliderList.offsetWidth;
    const slidesToShow = Math.floor(movePosition / itemWidth);

    const countItems = slides.length;
    prev.classList.toggle('disabled', slideIndex === 0);
    next.classList.toggle('disabled', slideIndex >= countItems - slidesToShow);

    let borderToSlide = (countItems - (slidesToShow + 1)) * itemWidth + itemWidth - (movePosition - itemWidth * slidesToShow);
    if (countItems <= slidesToShow) {
      borderToSlide = 0;
    }

    if (arrows && prev && next) {
      arrows.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('slider__button_right')) {
          slideIndex++;
        } else if (target.classList.contains('slider__button_left')) {
          slideIndex--;
        } else {
          return;
        }
        slide();
      });
    }

    const slide = (toSlide) => {
      if (sliderTrack) {
        sliderTrack.style.transition = 'transform .5s';
        if (toSlide) {
          sliderTrack.style.transform = `translate3d(-${toSlide}px, 0px, 0px)`;
        } else {
          if (slideIndex < 0) {
            slideIndex = 0;
          }
          const slideWidth = slideIndex * itemWidth > borderToSlide ? borderToSlide : slideIndex * itemWidth;
          sliderTrack.style.transform = `translate3d(-${slideWidth}px, 0px, 0px)`;

          prev.classList.toggle('disabled', slideIndex === 0);
          next.classList.toggle('disabled', slideIndex >= countItems - slidesToShow);
        }
      }
    };

    const getEvent = () => {
      return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    };

    let transition = true;
    let posInit = 0;
    let posX1 = 0;
    let posX2 = 0;
    let posY1 = 0;
    let posY2 = 0;
    let posFinal = 0;
    let isSwipe = false;
    let isScroll = false;
    let allowSwipe = true;
    // const nextTrf = 0;
    // const prevTrf = 0;
    // const posThreshold = slides[0].offsetWidth * 0.35;
    const trfRegExp = /([-0-9.]+(?=px))/;
    let swipeStartTime;
    let swipeEndTime;
    const swipeStart = () => {
      const evt = getEvent();
      if (allowSwipe) {
        swipeStartTime = Date.now();
        transition = true;
        // nextTrf = (slideIndex + 1) * -itemWidth;
        // prevTrf = (slideIndex - 1) * -itemWidth;
        posInit = posX1 = evt.clientX;
        posY1 = evt.clientY;
        sliderTrack.style.transition = '';
        slider.addEventListener('touchmove', {handleEvent: swipeAction});
        slider.addEventListener('touchend', swipeEnd);
        sliderList.classList.remove('grab');
        sliderList.classList.add('grabbing');
      }
    };

    // const lastTrf = -(countItems * itemWidth);

    const swipeAction = () => {
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
        if (posY >= 7) {
          isScroll = true;
          allowSwipe = false;
        } else if (posY < 7) {
          isSwipe = true;
          event.preventDefault();
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

      sliderList.classList.add('grab');
      sliderList.classList.remove('grabbing');

      if (allowSwipe) {
        swipeEndTime = Date.now();
        if (posInit !== posX1 && !isScroll && swipeEndTime - swipeStartTime < 800) {
          widthSlide += (posInit - posX1) * 3;
          if (widthSlide > borderToSlide) {
            widthSlide = borderToSlide;
          }
          if (widthSlide <= 0) {
            widthSlide = 0;
          }
          slide(widthSlide);
        } else if (widthSlide + (posInit - posX1) > borderToSlide) {
          slide(borderToSlide);
          sliderTrack.style.transform = `translate3d(-${borderToSlide}px, 0px, 0px)`;
        } else if (widthSlide + (posInit - posX1) <= 0) {
          slide(0);
          sliderTrack.style.transform = `translate3d(0px, 0px, 0px)`;
        }

      }
      isScroll = false;
    };

    sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
    sliderList.classList.add('grab');
    sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
    slider.addEventListener('touchstart', swipeStart);
  }
};
