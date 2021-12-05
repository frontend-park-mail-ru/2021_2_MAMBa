import {BaseView} from '../BaseView/BaseView.js';
import profilePug from '../../components/profile/profile.pug';
import profileHeader from '../../components/profile/profileHeader/profileHeader.pug';
import starsAndReviews from '../../components/profile/starsAndReviews/starsAndReviews.pug';
import bookmarksPug from '../../components/profile/bookmarks/bookmarks.pug';
import bookmarksContent from '../../components/profile/bookmarks/bookmarkBlock/bookmarkContent.pug';
import reviewsContent from '../../components/profile/starsAndReviews/reviewBlock/reviewsContent.pug';
import settingsPug from '../../components/profile/settings/settings.pug';
import settingsLinkPug from '../../components/profile/profileMenu/addSettingsLink.pug';
import loader from '../../components/loader/loader.pug';
import noAccessPug from '../../components/noAccess/noAccess.pug';
import emptySignPug from '../../components/emptySign/emptySign.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {menuLinks, menuObjects} from '../../consts/profileMenu';
import {SettingsInput} from '../../consts/settingsInputs.js';
import {ROOT} from '../../main';
import {statuses} from '../../consts/reqStatuses.js';
import {createElementFromHTML, renderBaseView} from '../../utils/utils.js';
import {ROUTES} from '../../consts/routes';


export class ProfileView extends BaseView {
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
  }

  render = (routeData) => {
    if (window.location.pathname.match(`${ROUTES.Profile}/\\d+/\?$`)) {
      this.eventBus.emit(EVENTS.ProfilePage.redirectToReviews);
      return;
    }
    this.routeData = routeData;
    const content = document.querySelector('.content');
    if (!content) {
      ROOT.innerHTML = renderBaseView();
      this.eventBus.emit(EVENTS.Header.Render.header);
    } else {
      const profileContent = document.querySelector('.profile__profile-content');
      if (profileContent) {
        profileContent.innerHTML = loader();
      }
    }
    this.emitGetContent();
  }

  emitGetContent = () => {
    this.eventBus.emit(EVENTS.ProfilePage.getContent, this.routeData);
  }

  renderContent = (user, isThisUser) => {
    if (!user || !menuLinks) {
      return;
    }
    this.user = user;
    this.user.isThisUser = isThisUser;
    const content = document.querySelector('.content');
    if (content) {
      const profileHeader = document.querySelector('.profile-header');
      const profileMenu = document.querySelector('.profile-menu');
      if (!profileHeader || !profileMenu || profileHeader.dataset.user !== this.user.id) {
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
    const settingsLink = [...document.querySelectorAll('.profile-menu__link')]
        .find((elem) => elem.textContent.includes(menuObjects.settings.name));
    if (settingsLink) {
      if (settingsLink.classList.contains('profile-menu__link_active')) {
        const profileContent = document.querySelector('.profile__profile-content');
        if (!profileContent) {
          this.eventBus.emit(EVENTS.App.ErrorPage);
        }
        profileContent.innerHTML = noAccessPug();
      }
      settingsLink.remove();
    }
  }

  addSettingsToMenu = () => {
    const settingsLink = [...document.querySelectorAll('.profile-menu__link')]
        .find((elem) => elem.textContent.includes(menuObjects.settings.name));
    const reviewsLink = [...document.querySelectorAll('.profile-menu__link')]
        .find((elem) => elem.textContent.includes(menuObjects.reviewsMarks.name));
    if (reviewsLink && !settingsLink) {
      reviewsLink.after(createElementFromHTML(settingsLinkPug({link: menuObjects.settings})));
    }
    this.changeActiveMenuButton(this.routeData.path.path);
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
      inputsData.profile_pic = this.user.profile_pic;
      this.eventBus.emit(EVENTS.ProfilePage.ChangeProfile, inputsData, formData);
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

  renderNoAccess = () => {
    const profileContent = document.querySelector('.profile__profile-content');
    if (!profileContent) {
      return;
    }
    profileContent.innerHTML = noAccessPug();
  }

  renderSettingsPage = () => {
    const profileContent = document.querySelector('.profile__profile-content');
    if (!profileContent) {
      return;
    }
    if (!this.user || !this.user.profile_pic) {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
    for (const input of SettingsInput) {
      input.value = this.user[input.name];
    }
    profileContent.innerHTML = settingsPug({inputs: SettingsInput, profile_pic: this.user.profile_pic});
    this.listenAvatarChanged();
    this.submitSettingsButton();
  }

  listenAvatarChanged = () => {
    const avatarInput = document.querySelector('#avatar');
    const avatarDiv = document.querySelector('.settings-form__avatar');
    if (!avatarInput || !avatarDiv) {
      return;
    }
    avatarInput.addEventListener('change', (event) => {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        avatarDiv.style.backgroundImage = `url(${event.target.result})`;
      });
      reader.readAsDataURL(event.target.files[0]);
    });
  }

  renderBookmarksPage = (bookmarks) => {
    if (!bookmarks || !bookmarks.body) {
      return;
    }
    for (const bookmark of bookmarks.body.bookmarks_list) {
      bookmark.rating = (!(bookmark.rating % 1) || bookmark.rating === 10) ? `${bookmark.rating}.0` : bookmark.rating;
    }
    const profileContent = document.querySelector('.profile__profile-content');
    if (!profileContent) {
      return;
    }
    if (profileContent.querySelector('.loader')) {
      if (bookmarks.status === statuses.NO_BLOCKS || bookmarks.body.bookmarks_list.length === 0) {
        profileContent.innerHTML = emptySignPug({
          text: 'Вы еще не добавили ни 1 фильма в закладки',
          blockClass: 'empty-sign-block_big',
        });
      } else {
        profileContent.innerHTML = bookmarksPug(bookmarks.body);
      }
    } else {
      const bookmarksBlock = document.querySelector('.stars-reviews-block');
      if (!bookmarksBlock) {
        return;
      }
      bookmarksBlock.innerHTML += bookmarksContent(bookmarks.body);
    }
    if (!bookmarks.body.more_available) {
      this.hideMoreButton();
    }
    this.submitMoreButton();
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
      if (reviewsMarks.status === statuses.NO_BLOCKS || reviewsMarks.body.review_list.length === 0) {
        profileContent.innerHTML = emptySignPug({
          text: 'Вы еще не оставили отзыв (оценку) ни на 1 фильме',
          blockClass: 'empty-sign-block_big',
        });
      } else {
        profileContent.innerHTML = starsAndReviews(reviewsMarks.body);
      }
    } else {
      const starsAndReviews = document.querySelector('.stars-reviews-block');
      if (!starsAndReviews) {
        return;
      }
      starsAndReviews.innerHTML += reviewsContent(reviewsMarks.body);
    }
    if (!reviewsMarks.body.more_available) {
      this.hideMoreButton();
    }
    this.submitMoreButton();
  }
}
