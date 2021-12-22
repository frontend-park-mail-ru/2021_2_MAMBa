import {Model} from './model';
import {EVENTS} from '../consts/EVENTS';
import {getSearch} from '../modules/http';
import {statuses} from '../consts/reqStatuses';
import {URLS} from '../consts/urls';

export class SearchModel extends Model {
  constructor(eventBus) {
    super(eventBus);
    this.paginationFilms = {
      moreAvailable: false,
      skip: 0,
      limit: 20,
    };
    this.paginationPersons = {
      moreAvailable: false,
      skip: 0,
      limit: 20,
    };
  }

  getContent = () => {
    const query = new URL(location.href).searchParams.get('query');
    if (!query) {
      this.eventBus.emit(EVENTS.searchPage.renderEmptyPage);
      return;
    }
    getSearch(encodeURIComponent(query), this.paginationFilms.skip, this.paginationFilms.limit,
        this.paginationPersons.skip,
        this.paginationPersons.limit).then((response) => {
      if (!response) {
        return;
      }
      if (response?.parsedJson?.status === statuses.OK) {
        const responseBody = response.parsedJson?.body;
        if (!responseBody || !responseBody.persons || !responseBody.films) {
          this.eventBus.emit(EVENTS.App.ErrorPage);
          return null;
        }
        this.addPersonUrl(responseBody.persons.person_list);
        this.eventBus.emit(EVENTS.searchPage.renderFilmsPersons, responseBody);
      } else if (response?.parsedJson?.status === statuses.NOT_FOUND) {
        this.eventBus.emit(EVENTS.App.ErrorPage);
        return null;
      }
    });
  }

  addPersonUrl = (array) => {
    if (!array) {
      return;
    }
    for (const person of array) {
      person.person_url = `${URLS.pages.persons}/${person.id}`;
    }
  }
}
