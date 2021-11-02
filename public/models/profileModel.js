import {Events} from '../consts/events.js';
import {Model} from './model';
import {getProfile, getNProfilePagesBlocks} from '../modules/http';
import {authModule} from '../modules/authorization';
import {getMenuLinks, menuObjects} from '../consts/profileMenu';
import {URLS} from '../consts/urls';

export class ProfileModel extends Model {
  constructor(eventBus) {
    super(eventBus);
    this.currentPagePag = {
      limit: 0,
      skip: 0,
      path: '/',
      haveMore: false,
    };
  }

  getUserIdFromPath = (path) => {
    if (!path || typeof path !== 'string') {
      return null;
    }
    const userId = path.split('/')[2];
    if (!userId) {
      return null;
    }
    return userId;
  }

  getContent = (routeData) => {
    if (!routeData || !routeData.path || !routeData.path.path || routeData.path.path.split('/').length > 4) {
      // TODO ERROR 404
      return;
    }
    this.path = routeData.path.path;
    this.userId = this.getUserIdFromPath(routeData.path.path);
    if (!this.userId) {
      // TODO ERROR 404
      return;
    }

    getProfile(this.userId).then((response) => {
      if (!response) {
        return;
      }
      if (response.status === 200) {
        const user = response.parsedJson.body;
        getMenuLinks(user.id);
        this.eventBus.emit(Events.ProfilePage.Render.Content, user, this.isThisUser());
      } else if (response.status === 404) {
        // TODO ERROR 404
      }
    });
  }

  getCurrentPageBlocks = () => {
    switch (this.path) {
      case `profile/${this.userId}`: {
        return;
      }
      case menuObjects.settings.href: {
        this.eventBus.emit(Events.ProfilePage.Render.Settings);
        break;
      }
      case menuObjects.reviewsMarks.href: {
        this.clearCurrentPagePag(this.path, menuObjects.reviewsMarks);
        this.getNBlocks(URLS.api.getReviewsAndStars, Events.ProfilePage.Render.ReviewsMarks);
        break;
      }
      default:
        // TODO 404
    }
  }

  clearCurrentPagePag = (path, menuObject) => {
    if (!this.currentPagePag) {
      return;
    }
    if (this.currentPagePag.path !== path) {
      this.currentPagePag.path = path;
      this.currentPagePag.skip = 0;
      this.currentPagePag.limit = menuObject.limit;
      this.currentPagePag.haveMore = false;
    }
  }

  getNBlocks = (url, event) => {
    getNProfilePagesBlocks(url, this.userId, this.currentPagePag.limit, this.currentPagePag.skip).then((response) => {
      if (!response) {
        return;
      }
      if (response.status === 200) {
        this.currentPagePag.skip += this.currentPagePag.limit;
        if (event === Events.ProfilePage.Render.ReviewsMarks) {
          this.cutStrings(response.parsedJson.body.review_list, 'review_text');
          this.makeReviewUrl(response.parsedJson.body.review_list, 'id');
          this.makeFilmUrl(response.parsedJson.body.review_list, 'film_id');
        }
        this.eventBus.emit(event, response.parsedJson.body);
      } else if (response.status === 404) {
        // TODO ERROR 404
      }
    });
  }

  cutStrings = (stringArray, fieldName) => {
    if (!stringArray || !stringArray[0][fieldName]) {
      return;
    }
    for (let item of stringArray) {
      if (item[fieldName].length < 25) {
        continue;
      }
      if (item[fieldName].length > 25) {
        item[fieldName] = item[fieldName].slice(0, 25) + '\n' + item[fieldName].slice(25);
      }
      if (item[fieldName].length > 40) {
        item[fieldName] = item[fieldName].slice(0, 40) + '...';
      }
    }
  }

  makeFilmUrl = (stringArray, fieldName) => {
    if (!stringArray || !stringArray[0][fieldName]) {
      return;
    }
    for (let item of stringArray) {
      item.film_url = `/films/${item[fieldName]}`;
    }
  }

  makeReviewUrl = (stringArray, fieldName) => {
    if (!stringArray || !stringArray[0][fieldName]) {
      return;
    }
    for (let item of stringArray) {
      item.review_url = `/reviews/${item[fieldName]}`;
    }
  }

  redirectToAuth = () => {
    this.eventBus.emit(Events.PathChanged, '/auth');
  }

  isThisUser = () => {
    if (!this.userId) {
      return false;
    }
    if (authModule.user) {
      if (authModule.user.id === this.userId) {
        return true;
      }
    }
    return false;
  }
}
