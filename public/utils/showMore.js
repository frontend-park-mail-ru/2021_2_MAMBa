import {eventBus} from '../modules/eventBus.js';
import actorFilmsContent from '../components/filmsWithDescription/filmCardsWithDescription.pug';

/**
 * Catch scroll and render films
 * @param {object} data - Contains info about actor films to show.
 * @param {object} buttonClass - Contains info about button class.
 * @param {string} event - Contains info event.
 */
export const showMore = (data, buttonClass, event) => {
  const buttonShowMore = document.querySelector(`${buttonClass}`);
  if (buttonShowMore) {
    buttonShowMore.addEventListener('click', (e) => {
      e.preventDefault();
      const newData = {
        id: data.actor.id,
        skip: data.skip + data.limit,
        limit: data.limit,
      };
      eventBus.emit(event, newData, data);
    });
  }
};

export const checkShowMoreButton = (available, buttonClass) => {
  const buttonShowMore = document.querySelector(`${buttonClass}`);
  if (!available && buttonShowMore) {
    buttonShowMore.classList.add('hidden');
  }
};

/**
 * Render content favourites page from pug template to content div.
 * @param {object} newData - Contains info about actor films to show.
 * @param {object} dataOfRenderedFilms - Contains info about actor films before show more.
 */
export const renderFilms = (newData, dataOfRenderedFilms) => {
  const template = actorFilmsContent(newData);
  const showMoreContainer = document.querySelector('.films-with-description__container');
  if (showMoreContainer) {
    showMoreContainer.innerHTML += template;
  }
  dataOfRenderedFilms.moreAvailable = newData.moreAvailable;
  dataOfRenderedFilms.skip = newData.skip;
  dataOfRenderedFilms.limit = newData.limit;
  checkShowMoreButton(dataOfRenderedFilms.moreAvailable, '.button__show-more');
};


export const showScrollMore = (data, event, condition) => {
  if (!condition) {
    condition = true;
  }
  const block = document.getElementById('infinite-scroll');
  let contentHeight = block.offsetHeight;
  window.addEventListener('scroll', () => {
    const yOffset = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const y = yOffset + windowHeight;
    if (y >= contentHeight && condition) {
      contentHeight = block.offsetHeight;
      const newData = nextMonth(data.year, data.month);
      data.year = newData[0];
      data.month = newData[1];
      eventBus.emit(event, data.year, data.month);
      // contentHeight = block.offsetHeight;
    }
  });

  const nextMonth = (year, month) => {
    if (month == 12) {
      month = 1;
      year += 1;
    } else {
      month += 1;
    }
    return [year, month];
  };
};
