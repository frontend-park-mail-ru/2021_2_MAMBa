export const slider = (selector) => {
  let slider = document.querySelector(selector);
  let sliderList = slider.querySelector('.slider-list');
  let sliderTrack = slider.querySelector('.slider-track');
  let slides = slider.querySelectorAll('.slide');
  let arrows = slider.querySelector('.slider-arrows');
  let prev = arrows.children[0];
  let next = arrows.children[1];
  let widthSlide = 0
  let itemWidth = slides[0].offsetWidth;

  let slideIndex = 0;
  let movePosition = sliderList.offsetWidth;
  let slidesToShow = Math.floor(movePosition / itemWidth)


  const countItems = slides.length;
  prev.classList.toggle('disabled', slideIndex === 0);
  next.classList.toggle('disabled', slideIndex >= countItems - slidesToShow);

  let borderToSlide = (countItems - (slidesToShow + 1)) * itemWidth + itemWidth - (movePosition - itemWidth * slidesToShow);
  console.log(borderToSlide)

  arrows.addEventListener('click', (e) => {
    let target = e.target;
    if (target.classList.contains('slider__button_right')) {
      slideIndex++;
    } else if (target.classList.contains('slider__button_left')) {
      slideIndex--;
    } else {
      return;
    }
    slide();
  });

  function stop(e) {
    console.log("in stop")
    e = e || event;
    e.preventDefault;
  }

  const slide = (toSlide) => {
    sliderTrack.style.transition = 'transform .5s';
    if (slideIndex < 0)
      slideIndex = 0
    if (toSlide)
      sliderTrack.style.transform = `translate3d(-${toSlide}px, 0px, 0px)`;
    else {
      let slideWidth = slideIndex * itemWidth > borderToSlide ? borderToSlide : slideIndex * itemWidth
      sliderTrack.style.transform = `translate3d(-${slideWidth}px, 0px, 0px)`;
    }
    prev.classList.toggle('disabled', slideIndex === 0);
    next.classList.toggle('disabled', slideIndex >= countItems - slidesToShow);
  };

  const getEvent = () => {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
  };

  let transition = true;
  let posInit = 0,
      posX1 = 0,
      posX2 = 0,
      posY1 = 0,
      posY2 = 0,
      posFinal = 0,
      isSwipe = false,
      isScroll = false,
      allowSwipe = true,
      nextTrf = 0,
      prevTrf = 0,
      posThreshold = slides[0].offsetWidth * 0.35,
      trfRegExp = /([-0-9.]+(?=px))/,
      swipeStartTime,
      swipeEndTime;
  const swipeStart = () => {
    let evt = getEvent();

    if (allowSwipe) {
      swipeStartTime = Date.now();
      transition = true;
      nextTrf = (slideIndex + 1) * -itemWidth;
      prevTrf = (slideIndex - 1) * -itemWidth;
      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;
      sliderTrack.style.transition = '';
      slider.addEventListener('touchmove', swipeAction);
      slider.addEventListener('touchend', swipeEnd);
      sliderList.classList.remove('grab');
      sliderList.classList.add('grabbing');
    }
  };

  const lastTrf = -(countItems * itemWidth);

  const swipeAction = () => {
    allowSwipe = true;
    let evt = getEvent(),
        style = sliderTrack.style.transform,
        transform = +style.match(trfRegExp)[0];
    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    if (!isSwipe && !isScroll) {
      console.log("tut kto-to est]&(")
      let posY = Math.abs(posY2);
      console.log("Yp,", posY, posX2)
      console.log("scroll,", isScroll)
      if (posY >= 7) {
        isScroll = true;
        console.log("after,", isScroll)
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
        stop();
      }
    }

    if (isSwipe) {
      // if (slideIndex === 0) {
      //   if (posInit < posX1) {
      //     setTransform(transform, 0);
      //     return;
      //   } else {
      //     allowSwipe = true;
      //   }
      // }
      //
      // // запрет ухода вправо на последнем слайде
      // if (slideIndex >= countItems - slidesToShow) {
      //   if (posInit > posX1) {
      //     setTransform(transform, lastTrf);
      //     return;
      //   } else {
      //     allowSwipe = true;
      //   }
      // }

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
      if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
        if (posInit < posX1 && slideIndex > 0) {
          slideIndex--;
        } else if (posInit > posX1 && slideIndex < countItems - slidesToShow) {
          slideIndex++;
        }
      }
      if (posInit !== posX1 && !isScroll) {
        widthSlide += (posInit - posX1) * 5
        if (widthSlide > borderToSlide)
          widthSlide = borderToSlide
        if (widthSlide <= 0)
          widthSlide = 0
        slide(widthSlide);
      } else {
        allowSwipe = true;
      }
    }
    isScroll = false;
  };
  const setTransform = (transform, compareTransform) => {
    if (transform <= compareTransform) {
      sliderTrack.style.transform = `translate3d(${compareTransform}px, 0px, 0px)`;
    }
  }
  // const reachEdge = () => {
  //   transition = false;
  //   swipeEnd();
  //   // allowSwipe = true;
  // };

  sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
  sliderList.classList.add('grab');
  sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
  slider.addEventListener('touchstart', swipeStart);
}
