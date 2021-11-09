import {Events} from '../consts/events.js';
import {Model} from './model';
import {getProfile, getNProfilePagesBlocks, changeAvatar, changeSettings} from '../modules/http';
import {authModule} from '../modules/authorization';
import {getMenuLinks, menuObjects} from '../consts/profileMenu';
import {URLS} from '../consts/urls';
import {statuses} from '../consts/reqStatuses';
import {ROUTES} from '../consts/routes';

export class ProfileModel extends Model {
  constructor(eventBus) {
    super(eventBus);
    this.currentPagePag = {
      limit: 0,
      skip: 0,
      path: URLS.pages.main,
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
    if (!routeData || !routeData?.path?.path || routeData.path.path.split('/').length > 4) {
      this.eventBus.emit(Events.App.ErrorPage);
      return;
    }
    this.path = routeData.path.path;
    this.userId = this.getUserIdFromPath(routeData.path.path);
    if (!this.userId) {
      this.eventBus.emit(Events.App.ErrorPage);
      return;
    }
    this.clearCurrentPagePag(this.path, menuObjects.reviewsMarks);

    getProfile(this.userId).then((response) => {
      if (!response) {
        return;
      }
      if (response?.parsedJson?.status === statuses.OK) {
        const user = response.parsedJson?.body;
        if (!user || !user.id) {
          return null;
        }
        getMenuLinks(user.id);
        this.eventBus.emit(Events.ProfilePage.Render.Content, user, this.isThisUser());
      } else if (response?.parsedJson?.status === statuses.NOT_FOUND) {
        this.eventBus.emit(Events.App.ErrorPage);
        return null;
      }
    });
  }

  changePagAndGetNBlocks = () => {
    this.currentPagePag.skip += this.currentPagePag.limit;
    this.getCurrentPageBlocks();
  }

  getCurrentPageBlocks = () => {
    switch (this.path) {
      case `${ROUTES.Profile}/${this.userId}`: {
        return;
      }
      case menuObjects.settings.href: {
        this.eventBus.emit(Events.ProfilePage.Render.Settings);
        break;
      }
      case menuObjects.reviewsMarks.href: {
        this.getNBlocks(URLS.api.getReviewsAndStars, Events.ProfilePage.Render.ReviewsMarks);
        break;
      }
      default:
        this.eventBus.emit(Events.App.ErrorPage);
    }
  }

  clearCurrentPagePag = (path, menuObject) => {
    if (!this.currentPagePag) {
      return;
    }
    this.currentPagePag.path = path;
    this.currentPagePag.skip = 0;
    this.currentPagePag.limit = menuObject.limit;
    this.currentPagePag.haveMore = false;
  }

  getNBlocks = (url, event) => {
    getNProfilePagesBlocks(url, this.userId, this.currentPagePag.limit, this.currentPagePag.skip).then((response) => {
      if (!response) {
        return;
      }
      if (response?.parsedJson?.status === statuses.OK) {
        if (event === Events.ProfilePage.Render.ReviewsMarks) {
          this.makeReviewUrl(response.parsedJson.review_list, 'id');
          this.makeFilmUrl(response.parsedJson.review_list, 'film_id');
        }
        this.eventBus.emit(event, response.parsedJson);
      } else if (response?.parsedJson?.status === statuses.NOT_FOUND) {
        this.eventBus.emit(Events.App.ErrorPage);
      } else if (response?.parsedJson?.status === statuses.NO_BLOCKS) {
        this.eventBus.emit(event, response.parsedJson);
      }
    });
  }

  changeProfile = (inputsData) => {
    if (!inputsData) {
      return;
    }
    changeSettings(inputsData).then((response) => {
      if (!response) {
        return;
      }
      if (response?.parsedJson?.status === statuses.OK) {
        this.user = response.parsedJson;
        this.eventBus.emit(Events.ProfilePage.ChangedProfile, response.parsedJson?.body);
      }
    }).catch(() => {
      this.eventBus.emit(Events.App.ErrorPage);
    });
  }

  changeProfileAvatar = (avatar) => {
    if (!avatar) {
      return;
    }
    changeAvatar(avatar).then((response) => {
      if (!response) {
        return;
      }
      if (response?.parsedJson?.status === statuses.OK) {
        this.user = response.parsedJson;
        this.eventBus.emit(Events.ProfilePage.ChangedProfile, response.parsedJson?.body);
      }
    }).catch(() => {
      this.eventBus.emit(Events.App.ErrorPage);
    });
  }

  makeFilmUrl = (stringArray, fieldName) => {
    if (!stringArray || !stringArray[0][fieldName]) {
      return;
    }
    for (const item of stringArray) {
      item.film_url = `/films/${item[fieldName]}`;
    }
  }

  makeReviewUrl = (stringArray, fieldName) => {
    if (!stringArray || !stringArray[0][fieldName]) {
      return;
    }
    for (const item of stringArray) {
      item.review_url = `/reviews/${item[fieldName]}`;
    }
  }

  isThisUser = () => {
    if (!this.userId || !authModule || !authModule.user?.id) {
      return false;
    }
    return authModule.user.id === this.userId;
  }
}
