import {EVENTS} from '../consts/EVENTS.js';
import {Model} from './model';
import {getProfile, getNProfilePagesBlocks, changeAvatar, changeSettings} from '../modules/http';
import {authModule} from '../modules/authorization';
import {getMenuLinks, menuObjects} from '../consts/profileMenu';
import {URLS} from '../consts/urls';
import {statuses} from '../consts/reqStatuses';
import {ROUTES} from '../consts/routes';
const maxWordsInURl = 4;

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
    if (!routeData || !routeData?.path?.path || routeData.path.path.split('/').length > maxWordsInURl) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }
    this.path = routeData.path.path;
    this.userId = this.getUserIdFromPath(routeData.path.path);
    if (!this.userId) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
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
        console.log('emitInProfile');
        this.eventBus.emit(EVENTS.ProfilePage.Render.Content, user, this.isThisUser());
      } else if (response?.parsedJson?.status === statuses.NOT_FOUND) {
        this.eventBus.emit(EVENTS.App.ErrorPage);
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
        this.eventBus.emit(EVENTS.PathChanged, {path: `${ROUTES.Profile}/${this.userId}/reviews_marks`});
        return;
      }
      case menuObjects.settings.href: {
        const authEvent = authModule.lastEvent;
        if (authEvent === EVENTS.authorization.notLoggedIn || authEvent === EVENTS.authorization.notLoggedIn) {
          this.eventBus.emit(EVENTS.App.noAccess);
          return;
        }
        if (authEvent === EVENTS.authorization.gotUser) {
          if (this.isThisUser()) {
            this.eventBus.emit(EVENTS.ProfilePage.addSettingsToMenu);
          } else {
            this.eventBus.emit(EVENTS.App.noAccess);
          }
        }
        break;
      }
      case menuObjects.reviewsMarks.href: {
        this.getNBlocks(URLS.api.getReviewsAndStars, EVENTS.ProfilePage.Render.ReviewsMarks);
        break;
      }
      default:
        this.eventBus.emit(EVENTS.App.ErrorPage);
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
        if (event === EVENTS.ProfilePage.Render.ReviewsMarks) {
          if (!response.parsedJson.body) {
            this.eventBus.emit(EVENTS.App.ErrorPage);
            return;
          }
          if (response.parsedJson.body.review_list.length) {
            this.makeReviewUrl(response.parsedJson.body.review_list, 'id');
            this.makeFilmUrl(response.parsedJson.body.review_list, 'film_id');
          }
        }
        this.eventBus.emit(event, response.parsedJson);
      } else if (response?.parsedJson?.status === statuses.NOT_FOUND) {
        this.eventBus.emit(EVENTS.App.ErrorPage);
      } else if (response?.parsedJson?.status === statuses.NO_BLOCKS) {
        this.eventBus.emit(event, response.parsedJson);
      }
    });
  }

  changeProfile = async (inputsData, formData) => {
    if (!inputsData || !formData) {
      return;
    }
    let user = null;
    if (formData.has('avatar')) {
      user = await this.changeProfileAvatar(formData);
    }
    if (user) {
      inputsData.profile_pic = user.profile_pic;
    }
    changeSettings(inputsData).then((response) => {
      if (!response) {
        return;
      }
      if (response?.parsedJson?.status === statuses.OK) {
        if (!response.parsedJson.body) {
          return;
        }
        this.user = response.parsedJson.body;
        this.eventBus.emit(EVENTS.ProfilePage.ChangedProfile, this.user);
      }
    }).catch(() => {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    });
  }

  changeProfileAvatar = async (avatar) => {
    if (!avatar) {
      return null;
    }
    const response = await changeAvatar(avatar);
    if (!response) {
      return null;
    }
    if (response?.parsedJson?.status === statuses.OK) {
      this.user = response.parsedJson.body;
      return this.user;
    }
  }

  makeFilmUrl = (stringArray, fieldName) => {
    if (!stringArray.length || !stringArray[0][fieldName]) {
      return null;
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

  checkSettingsPage = () => {
    if (!authModule || !authModule.user) {
      this.eventBus.emit(EVENTS.App.noAccess);
    }
    if (this.isThisUser()) {
      this.eventBus.emit(EVENTS.ProfilePage.addSettingsToMenu);
    }
  }

  isThisUser = () => {
    if (!this.userId || !authModule || !authModule.user || !authModule.user.id) {
      return false;
    }
    return authModule.user.id.toString() === this.userId;
  }
}
