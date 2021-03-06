import {BaseView} from '../BaseView/BaseView.js';
import searchPug from '../../components/search/search.pug';
import personsPug from '../../components/search/personsBlock/personsContent.pug';
import emptyPagePug from '../../components/search/emptyPage.pug';
import emptySignPug from '../../components/emptySign/emptySign.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {convertArrayToActorFilms} from '../../modules/adapters';
import {renderFilms} from '../../utils/showMore.js';


export class SearchView extends BaseView {
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
  }

  emitGetContent = () => {
    this.renderContent();
    this.eventBus.emit(EVENTS.searchPage.getContent);
  }

  renderContent = () => {
    const query = new URL(location.href).searchParams.get('query');
    if (!query) {
      return;
    }
    const content = document.querySelector('.content');
    if (!content) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
    content.innerHTML = searchPug({value: query});
  }

  renderFilmsPersons = (response) => {
    if (!response || !response.films || !response.persons) {
      return;
    }
    const filmContainer = document.querySelector('.film__items');
    if (!filmContainer) {
      return;
    }
    if (!response.films.film_list.length) {
      filmContainer.innerHTML = emptySignPug({
        text: 'К сожалению, по вашему запросу фильмов не найдено',
        blockClass: 'empty-sign-block_white',
      });
    } else {
      filmContainer.innerHTML = '';
      renderFilms(convertArrayToActorFilms(response.films));
    }

    const personsContainer = document.querySelector('.persons-block');
    if (!personsContainer) {
      return;
    }
    if (!response.persons.person_list.length) {
      personsContainer.innerHTML = emptySignPug({
        text: 'К сожалению, по вашему запросу персон не найдено',
        blockClass: 'empty-sign-block',
      });
      return;
    }
    personsContainer.innerHTML = personsPug(response.persons);
  }

  renderEmptyPage = () => {
    const content = document.querySelector('.content');
    if (!content) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
    content.innerHTML = emptyPagePug();
  }
}
