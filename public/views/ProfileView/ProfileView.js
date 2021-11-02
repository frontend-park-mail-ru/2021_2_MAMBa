import {BaseView} from '../BaseView/BaseView.js';
import profilePug from '../../components/profile/profile.pug';
import starsAndReviews from '../../components/profile/starsAndReviews.pug';
import profileMenuPug from '../../components/profile/profileMenu.pug';
import settingsPug from '../../components/profile/settings.pug';
import {Events} from '../../consts/events.js';
import {menuLinks} from '../../consts/profileMenu';
import {SettingsInput} from '../../consts/settingsInputs.js';
import {changeSettings, changeAvatar} from '../../modules/http.js';


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
    this.user.thisUser = isThisUser;
    const template = profilePug(Object.assign(this.user, menuLinks));
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
      this.changeActiveMenuButton(this.routeData.path.path);
      this.submitMoreButton();
    } else {
      // TODO ERROR
      return;
    }
    this.eventBus.emit(Events.ProfilePage.GetCurrentPageBlocks);
    this.submitSettingsButton();
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

  changeActiveMenuButton = (href) => {
    const oldButton = document.querySelector('.active-profile-menu-button');
    if (oldButton) {
      oldButton.classList.remove('active-profile-menu-button');
    }
    const buttons = document.querySelectorAll('.profile-menu-link');
    if (!buttons.length) {
      return;
    }
    for (let button of buttons) {
      if (button.href.includes(href)) {
        button.classList.add('active-profile-menu-button');
        break;
      }
    }
  }

  submitMoreButton = () => {
    const moreButton = document.querySelector('.more-btn');
    if (!moreButton) {
      return;
    }
    moreButton.addEventListener('click', () => {
      this.eventBus.emit(Events.ProfilePage.GetCurrentPageBlocks);
    });
  }

  submitSettingsButton = () => {
    const settingsForm = document.forms.settingsForm;
    if (!settingsForm) {
      return;
    }
    const settingsButton = document.querySelector('.settings-btn');
    if (!settingsButton) {
      return;
    }

    settingsButton.addEventListener('click', () => {
      let formData = new FormData(document.forms.settingsForm);
      console.log(formData.getAll('avatar'));
      if (settingsForm.avatar.files[0]) {
        changeAvatar(formData.getAll('avatar'));
      }
      const formTextInputs = settingsForm.querySelectorAll('.settings-inputs');
      if (!formTextInputs.length) {
        return;
      }
      const inputsData = {};
      for (const input of formTextInputs) {
        inputsData[input.name] = input.value;
      }
      changeSettings(inputsData).then((response) => {
        this.user = response.parsedJson.body;
      });
    });
  }

  hideMoreButton = () => {
    const moreButton = document.querySelector('.more-btn');
    if (!moreButton) {
      return;
    }
    moreButton.style.opacity = '0';
    moreButton.style.cursor = 'default';
  }

  renderSettingsPage = () => {
    const profileContent = document.querySelector('.profile-content');
    if (!profileContent) {
      return;
    }
    for (let input of SettingsInput) {
      input.value = this.user[input.name];
    }
    const inputs = {
      inputs: SettingsInput,
    };
    const template = settingsPug(inputs);
    profileContent.innerHTML = template;
  }

  renderBookmarksPage = (bookmarks) => {
  }

  renderSubscriptionsPage = (subscriptions) => {
  }

  renderReviewsMarksPage = (reviewsMarks) => {
    if (!reviewsMarks) {
      return;
    }
    const profileContent = document.querySelector('.profile-content');
    if (!profileContent) {
      return;
    }
    const template = starsAndReviews(reviewsMarks);
    if (profileContent.querySelector('.loader')) {
      profileContent.innerHTML = template;
      return;
    }
    profileContent.innerHTML += template;
    if (!reviewsMarks.more_avaliable) {
      this.hideMoreButton();
    }
  }
}
