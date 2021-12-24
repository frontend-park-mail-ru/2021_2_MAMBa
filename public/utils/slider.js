export const slider = (selector) => {
  const slider = document.querySelector(selector);
  if (slider) {
    const sliderList = slider.querySelector('.slider-list');
    const sliderTrack = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slide');
    let slideIndex = 0;

    const arrows = slider.querySelector('.slider-arrows');
    const prev = arrows.children[0];
    const next = arrows.children[1];

    const itemWidth = slides[0].offsetWidth;
    const movePosition = sliderList.offsetWidth;
    const slidesToShow = Math.floor(movePosition / itemWidth);

    const countItems = slides.length;

    const borderToSlide = countItems > slidesToShow ? (countItems - (slidesToShow + 1)) * itemWidth + itemWidth - (movePosition - itemWidth * slidesToShow): 0;

    sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
    prev.classList.toggle('disabled', slideIndex === 0);
    next.classList.toggle('disabled', slideIndex >= countItems - slidesToShow);

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

          if (slideIndex >= countItems - slidesToShow) {
            slideIndex = (countItems - slidesToShow - 1) > 0 ? countItems - slidesToShow - 1 : 0;
          }
          stopAnimation();
        }
      }
    };

    const getEvent = () => {
      return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    };

    let widthSlided = 0;
    // let transition = true;
    let posInit = 0;
    let posX1 = 0;
    let posX2 = 0;
    let posY1 = 0;
    let posY2 = 0;
    // let posFinal = 0;
    let isSwipe = false;
    let isScroll = false;
    let allowSwipe = true;
    const trfRegExp = /([-0-9.]+(?=px))/;
    let swipeStartTime;
    let swipeEndTime;
    const swipeStart = () => {
      const evt = getEvent();
      if (allowSwipe) {
        swipeStartTime = Date.now();
        // transition = true;
        posInit = posX1 = evt.clientX;
        posY1 = evt.clientY;
        sliderTrack.style.transition = '';
        // slider.addEventListener('touchstart', function(e) {e.preventDefault()}, false);
        slider.addEventListener('touchmove', function(e) {
          swipeAction(e);
        }, false);
        slider.addEventListener('touchend', swipeEnd);
      }
    };

    const swipeAction = (e) => {
      // e.preventDefault();
      // e.stopPropagation();
      allowSwipe = true;
      const evt = getEvent();
      const style = sliderTrack.style.transform;
      const transform = +style.match(trfRegExp)[0];
      posX2 = posX1 - evt.clientX;
      posX1 = evt.clientX;

      posY2 = posY1 - evt.clientY;
      posY1 = evt.clientY;
      console.log(isSwipe, isScroll)

      if (!isSwipe && !isScroll) {
        const posY = Math.abs(posY2);
        if (posY >= 7) {
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
      // posFinal = posInit - posX1;
      isSwipe = false;
      slider.addEventListener('touchmove', function(e) {
        swipeAction(e);
      }, false);
      slider.addEventListener('touchend', swipeEnd);

      if (allowSwipe) {
        swipeEndTime = Date.now();
        if (posInit !== posX1 && !isScroll && swipeEndTime - swipeStartTime < 800) {
          widthSlided += (posInit - posX1) * 3;
          if (widthSlided > borderToSlide) {
            widthSlided = borderToSlide;
          }
          if (widthSlided <= 0) {
            widthSlided = 0;
          }
          slide(widthSlided);
        } else if (widthSlided + (posInit - posX1) > borderToSlide) {
          slide(borderToSlide);
          sliderTrack.style.transform = `translate3d(-${borderToSlide}px, 0px, 0px)`;
        } else if (widthSlided + (posInit - posX1) <= 0) {
          slide(0);
          sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
        }
      }
      isScroll = false;
    };

    let isAnimating = false;
    const stopAnimation = () => {
      setTimeout(() => {
        isAnimating = false;
      }, 500);
    };
    if (countItems>slidesToShow) {
      slider.addEventListener('wheel', (event) => {
        if (isAnimating) {
          event.preventDefault();
          return;
        }
        const direction = event.deltaX;
        if (direction > 0) {
          event.preventDefault();
          slideIndex += 2;
          isAnimating = true;
          slide();
        } else if (direction < 0) {
          event.preventDefault();
          slideIndex -= 2;
          isAnimating = true;
          slide();
        }
      },
      {passive: false},
      );
    }

    sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
    slider.addEventListener('touchstart', swipeStart);
  }
};
