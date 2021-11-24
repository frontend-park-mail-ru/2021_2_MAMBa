import {eventBus} from '../modules/eventBus.js';

export const showMore = (data, buttonClass, event) => {
  console.log(data);
  const newData = {
    id: data.actor.id,
    skip: data.skip + data.limit,
    limit: data.limit,
  };
  const buttonShowMore = document.querySelector(`${buttonClass}`);
  if (buttonShowMore) {
    buttonShowMore.addEventListener('click', (e) => {
      e.preventDefault();
      eventBus.emit(event, newData);
    });
  }
}

export const checkShowMoreButton = (available, buttonClass) => {
  const buttonShowMore = document.querySelector(`${buttonClass}`);
  if (!available && buttonShowMore) {
    buttonShowMore.classList.add('hidden');
  }
}
