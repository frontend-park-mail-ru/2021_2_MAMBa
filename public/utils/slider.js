export const slider = (selector) => {
  let slider = document.querySelector(selector);
  let sliderList = slider.querySelector('.slider-list');
  let sliderTrack = slider.querySelector('.slider-track');
  let slides = slider.querySelectorAll('.slide');
  let arrows = slider.querySelector('.slider-arrows');
  let prev = arrows.children[0];
  let next = arrows.children[1];
  let itemWidth = slides[0].offsetWidth;
  let slideIndex = 0;
  let movePosition = sliderList.offsetWidth;
  let slidesToShow  = Math.floor(movePosition/itemWidth)

  const countItems = slides.length;
  prev.classList.toggle('disabled', slideIndex === 0);
  next.classList.toggle('disabled', slideIndex >= countItems-slidesToShow);

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

  const slide = () => {
    sliderTrack.style.transition = 'transform .5s';
    console.log("32")
    console.log(slideIndex)
    if (slideIndex<0 )
        slideIndex = 0

    if (slideIndex <= countItems-slidesToShow)
      sliderTrack.style.transform = `translate3d(-${slideIndex * itemWidth}px, 0px, 0px)`;
    prev.classList.toggle('disabled', slideIndex === 0);
    next.classList.toggle('disabled', slideIndex >= countItems-slidesToShow);
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
      slider.addEventListener('touchmove',swipeAction);
      slider.addEventListener('touchend', swipeEnd);
      sliderList.classList.remove('grab');
      sliderList.classList.add('grabbing');
    }
  };

  const lastTrf = -(countItems * itemWidth);

  const swipeAction = () => {
    let evt = getEvent(),
        style = sliderTrack.style.transform,
        transform = +style.match(trfRegExp)[0];
    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      if (slideIndex === 0) {
        if (posInit < posX1) {
          setTransform(transform, 0);
          return;
        } else {
          allowSwipe = true;
        }
      }

      // запрет ухода вправо на последнем слайде
      if (slideIndex >= countItems-slidesToShow) {
        console.log( transform, lastTrf)
        if (posInit > posX1) {
          console.log("last item")
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        }
      }

      if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
        reachEdge();
        return;
      }
      console.log("124")
      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }
  };
  const swipeEnd = () => {
    posFinal = posInit - posX1;
    isScroll = false;
    isSwipe = false;
    slider.removeEventListener('touchmove', swipeAction);
    slider.removeEventListener('touchend', swipeEnd);

    sliderList.classList.add('grab');
    sliderList.classList.remove('grabbing');

    if (allowSwipe) {
      swipeEndTime = Date.now();
      if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
        }
      }
      if (posInit !== posX1) {
        // allowSwipe = false;
        slide();
      } else {
        allowSwipe = true;
      }

    }
    // allowSwipe = true;
  };
  const setTransform = (transform, compareTransform) => {
    console.log("aa");
    if (transform <= compareTransform) {
      console.log("true");
        sliderTrack.style.transform = `translate3d(${compareTransform}px, 0px, 0px)`;
    }
    // allowSwipe = false;
  }
  const reachEdge = () => {
    transition = false;
    swipeEnd();
    // allowSwipe = true;
  };

  sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
  sliderList.classList.add('grab');
  sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
  slider.addEventListener('touchstart', swipeStart);
}
