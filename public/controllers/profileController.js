import {ProfileModel} from '../models/profileModel.js';
import {ProfileView} from '../views/ProfileView/ProfileView.js';
import {BaseController} from './baseController.js';
import {Events} from '../consts/events';
import {eventBus} from "../modules/eventBus";

/** Class representing profile page controller. */
export class ProfileController extends BaseController {
  /**
   * Create profile controller.
   */
  constructor() {
    super(ProfileView, ProfileModel);
  }

  subscribe = () => {
    this.eventBus.on(Events.ProfilePage.Render.Content, this.view.renderContent);
    this.eventBus.on(Events.ProfilePage.GetContent, this.model.getContent);
    this.eventBus.on(Events.Header.LogOut, this.view.deleteSettingsFromMenu);
    this.eventBus.on(Events.Authorization.GotUser, this.view.renderSettingsInMenu);
    this.eventBus.on(Events.ProfilePage.GetCurrentPageBlocks, this.model.getCurrentPageBlocks);
    this.eventBus.on(Events.ProfilePage.Render.Settings, this.view.renderSettingsPage);
    this.eventBus.on(Events.ProfilePage.Render.Bookmarks, this.view.renderBookmarksPage);
    this.eventBus.on(Events.ProfilePage.Render.Subscriptions, this.view.renderSubscriptionsPage);
    this.eventBus.on(Events.ProfilePage.Render.ReviewsMarks, this.view.renderReviewsMarksPage);
    this.eventBus.on(Events.ProfilePage.ChangeActiveMenuButton, this.view.changeActiveMenuButton);
    this.eventBus.on(Events.ProfilePage.NoMoreAvailable, this.view.hideMoreButton);
  }

  unsubscribe = () => {
    this.eventBus.off(Events.ProfilePage.Render.Content, this.view.renderContent);
    this.eventBus.off(Events.ProfilePage.GetContent, this.model.getContent);
    this.eventBus.off(Events.Header.LogOut, this.view.deleteSettingsFromMenu);
    this.eventBus.off(Events.Authorization.GotUser, this.view.renderSettingsInMenu);
    this.eventBus.off(Events.ProfilePage.GetCurrentPageBlocks, this.model.getCurrentPageBlocks);
    this.eventBus.off(Events.ProfilePage.Render.Settings, this.view.renderSettingsPage);
    this.eventBus.off(Events.ProfilePage.Render.Bookmarks, this.view.renderBookmarksPage);
    this.eventBus.off(Events.ProfilePage.Render.Subscriptions, this.view.renderSubscriptionsPage);
    this.eventBus.off(Events.ProfilePage.Render.ReviewsMarks, this.view.renderReviewsMarksPage);
    this.eventBus.off(Events.ProfilePage.ChangeActiveMenuButton, this.view.changeActiveMenuButton);
    this.eventBus.off(Events.ProfilePage.NoMoreAvailable, this.view.hideMoreButton);
  }
}
