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
 */
export const renderFilms = (newData) => {
  const template = actorFilmsContent(newData);
  const showMoreContainer = document.querySelector('.film__items');
  if (showMoreContainer) {
    showMoreContainer.innerHTML += template;
  }
  checkShowMoreButton(newData.moreAvailable, '.button__show-more');
};

/**
 * Update data of rendered films.
 * @param {object} newData - Contains info about actor films to show.
 * @param {object} dataOfRenderedFilms - Contains info about actor films before show more.
 */
export const updateRenderFilmsData = (newData, dataOfRenderedFilms) => {
  dataOfRenderedFilms.moreAvailable = newData.moreAvailable;
  dataOfRenderedFilms.skip = newData.skip;
  dataOfRenderedFilms.limit = newData.limit;
};
