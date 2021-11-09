import {BaseView} from '../BaseView/BaseView.js';
import profilePug from '../../components/profile/profile.pug';
import profileHeader from '../../components/profile/profileHeader/profileHeader.pug';
import starsAndReviews from '../../components/profile/starsAndReviews/starsAndReviews.pug';
import reviewsContent from '../../components/profile/starsAndReviews/reviewBlock/reviewsContent.pug';
import settingsPug from '../../components/profile/settings/settings.pug';
import loader from '../../components/loader/loader.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {menuLinks, menuObjects} from '../../consts/profileMenu';
import {SettingsInput} from '../../consts/settingsInputs.js';
import {ROOT} from '../../main';
import baseViewPug from '../BaseView/BaseView.pug';
import {headerLinks} from '../../consts/header';
import {statuses} from '../../consts/reqStatuses';


export class ProfileView extends BaseView {
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
  }

  render = (routeData) => {
    this.routeData = routeData;
    const content = document.querySelector('.content');
    if (!content) {
      ROOT.innerHTML = baseViewPug({headerLinks: headerLinks});
    } else {
      const profileContent = document.querySelector('.profile__profile-content');
      if (profileContent) {
        profileContent.innerHTML = loader();
      }
    }
    this.emitGetContent();
  }

  emitGetContent = () => {
    this.eventBus.emit(EVENTS.ProfilePage.GetContent, this.routeData);
  }

  renderContent = (user, isThisUser) => {
    if (!user || !menuLinks) {
      return;
    }
    this.user = user;
    this.user.thisUser = isThisUser;
    const content = document.querySelector('.content');
    if (content) {
      const profileHeader = document.querySelector('.profile-header');
      const profileMenu = document.querySelector('.profile-menu');
      if (!profileHeader || !profileMenu) {
        content.innerHTML = profilePug(Object.assign(this.user, menuLinks));
      }
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
      return;
    }
    this.changeActiveMenuButton(this.routeData.path.path);
    this.eventBus.emit(EVENTS.ProfilePage.GetCurrentPageBlocks);
  }

  deleteSettingsFromMenu = () => {
    if (!this.user.thisUser) {
      return;
    }
    const settingsLink = [...document.querySelectorAll('.profile-menu__link')]
        .find((elem) => elem.textContent.includes(menuObjects.settings.name));
    if (settingsLink) {
      settingsLink.remove();
    }
    menuLinks.thisUser = false;
  }

  changeActiveMenuButton = (href) => {
    const oldButton = document.querySelector('.profile-menu__link_active');
    if (oldButton) {
      oldButton.classList.remove('profile-menu__link_active');
    }
    const buttons = document.querySelectorAll('.profile-menu__link');
    if (!buttons.length) {
      return;
    }
    for (const button of buttons) {
      if (button.getAttribute('href') === href) {
        button.classList.add('profile-menu__link_active');
        break;
      }
    }
  }

  submitMoreButton = () => {
    const moreButton = document.querySelector('.profile__more-btn');
    if (!moreButton) {
      return;
    }
    moreButton.addEventListener('click', () => {
      this.eventBus.emit(EVENTS.ProfilePage.MoreButton);
    });
  }

  submitSettingsButton = () => {
    const settingsForm = document.forms.settingsForm;
    if (!settingsForm) {
      return;
    }
    const settingsButton = document.querySelector('.settings-form__btn');
    if (!settingsButton) {
      return;
    }

    settingsButton.addEventListener('click', () => {
      const formData = new FormData();
      if (settingsForm.avatar.files[0]) {
        formData.append('avatar', settingsForm.avatar.files[0]);
        console.log(settingsForm.avatar.files[0]);
        console.log(formData.getAll('avatar'));
        this.eventBus.emit(EVENTS.ProfilePage.ChangeAvatar, formData);
      }
      const formTextInputs = settingsForm.querySelectorAll('.settings-form__inputs');
      if (!formTextInputs.length) {
        return;
      }
      const inputsData = {};
      for (const input of formTextInputs) {
        inputsData[input.name] = input.value;
      }
      inputsData.gender = this.user.gender;
      inputsData.email = this.user.email;
      inputsData.picture_url = this.user.picture_url;
      this.eventBus.emit(EVENTS.ProfilePage.ChangeProfile, inputsData);
    });
  }

  hideMoreButton = () => {
    const moreButton = document.querySelector('.profile__more-btn');
    if (!moreButton) {
      return;
    }
    moreButton.style.visibility = 'hidden';
  }

  reRenderHeader = (changedUser) => {
    if (!changedUser) {
      return;
    }
    const header = document.querySelector('.profile-header');
    if (!header) {
      return;
    }
    header.outerHTML = profileHeader(changedUser);
  }

  renderSettingsPage = () => {
    const profileContent = document.querySelector('.profile__profile-content');
    if (!profileContent) {
      return;
    }
    for (const input of SettingsInput) {
      input.value = this.user[input.name];
    }
    profileContent.innerHTML = settingsPug({inputs: SettingsInput});
    this.submitSettingsButton();
  }

  renderBookmarksPage = (bookmarks) => {
  }

  renderSubscriptionsPage = (subscriptions) => {
  }

  renderReviewsMarksPage = (reviewsMarks) => {
    if (!reviewsMarks) {
      return;
    }
    const profileContent = document.querySelector('.profile__profile-content');
    if (!profileContent) {
      return;
    }
    if (profileContent.querySelector('.loader')) {
      if (reviewsMarks.status === statuses.NO_BLOCKS) {
        profileContent.innerHTML = '<h1>Пуфто:(</h1>';
      } else {
        profileContent.innerHTML = starsAndReviews(reviewsMarks);
      }
    } else {
      const starsAndReviews = document.querySelector('.stars-reviews-block');
      if (!starsAndReviews) {
        return;
      }
      starsAndReviews.innerHTML += reviewsContent(reviewsMarks);
    }
    if (!reviewsMarks.more_available) {
      this.hideMoreButton();
    }
    this.submitMoreButton();
  }
}
