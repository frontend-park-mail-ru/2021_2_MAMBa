import {ProfileModel} from '../models/profileModel.js';
import {ProfileView} from '../views/ProfileView/ProfileView.js';
import {BaseController} from './baseController.js';
import {EVENTS} from '../consts/EVENTS';

/** Class representing profile page controller. */
export class ProfileController extends BaseController {
  /**
   * Create profile controller.
   */
  constructor() {
    super(ProfileView, ProfileModel);
    this.events.push(
        {event: EVENTS.ProfilePage.Render.Content, handler: this.view.renderContent},
        {event: EVENTS.ProfilePage.GetContent, handler: this.model.getContent},
        {event: EVENTS.Header.LogOut, handler: this.view.deleteSettingsFromMenu},
        {event: EVENTS.ProfilePage.GetCurrentPageBlocks, handler: this.model.getCurrentPageBlocks},
        {event: EVENTS.ProfilePage.Render.Settings, handler: this.view.renderSettingsPage},
        {event: EVENTS.ProfilePage.Render.Bookmarks, handler: this.view.renderBookmarksPage},
        {event: EVENTS.ProfilePage.Render.Subscriptions, handler: this.view.renderSubscriptionsPage},
        {event: EVENTS.ProfilePage.Render.ReviewsMarks, handler: this.view.renderReviewsMarksPage},
        {event: EVENTS.ProfilePage.ChangeActiveMenuButton, handler: this.view.changeActiveMenuButton},
        {event: EVENTS.ProfilePage.ChangeProfile, handler: this.model.changeProfile},
        {event: EVENTS.ProfilePage.ChangeAvatar, handler: this.model.changeProfileAvatar},
        {event: EVENTS.ProfilePage.ChangedProfile, handler: this.view.reRenderHeader},
        {event: EVENTS.ProfilePage.MoreButton, handler: this.model.changePagAndGetNBlocks},
    );
  }
}
