import {BaseView} from '../BaseView/BaseView.js';
import profilePug from '../../components/profile/profile.pug';
import starsAndReviews from '../../components/profile/starsAndReviews.pug';
import profileMenuPug from '../../components/profile/profileMenu.pug';
import {Events} from '../../consts/events.js';
import {menuLinks} from '../../consts/profileMenu';


export class ProfileView extends BaseView {
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
  }

  emitGetContent = () => {
    this.eventBus.emit(Events.ProfilePage.GetContent, this.routeData);
  }

  renderContent = (user, isThisUser) => {
    if (!user || !menuLinks) {
      return;
    }
    this.user = user;
    user.thisUser = isThisUser;
    const template = profilePug(Object.assign(user, menuLinks));
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
    } else {
      // TODO ERROR
      return;
    }
    this.eventBus.emit(Events.ProfilePage.GetCurrentPageBlocks);
  }

  renderSettingsInMenu = () => {
    const menu = document.querySelector('.profile-menu');
    if (!menu) {
      return;
    }
    menuLinks.thisUser = true;
    menu.outerHTML = profileMenuPug(menuLinks);
  }

  deleteSettingsFromMenu = () => {
    const menu = document.querySelector('.profile-menu');
    if (!menu) {
      return;
    }
    menuLinks.thisUser = false;
    menu.outerHTML = profileMenuPug(menuLinks);
  }

  renderSettingsPage = () => {
  }

  renderBookmarksPage = (bookmarks) => {
  }

  renderSubscriptionsPage = (subscriptions) => {
  }

  renderReviewsMarksPage = (reviewsMarks) => {
    if (!reviewsMarks) {
      return;
    }
    const profileContent = document.querySelector('.profile_content');
    if (!profileContent) {
      return;
    }
    const template = starsAndReviews(reviewsMarks);
    if (profileContent.querySelector('.loader')) {
      profileContent.innerHTML = template;
      return;
    }
    profileContent.innerHTML += template;
  }
}
