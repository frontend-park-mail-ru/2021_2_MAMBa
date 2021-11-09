import {ProfileModel} from '../models/profileModel.js';
import {ProfileView} from '../views/ProfileView/ProfileView.js';
import {BaseController} from './baseController.js';
import {Events} from '../consts/events';

/** Class representing profile page controller. */
export class ProfileController extends BaseController {
  /**
   * Create profile controller.
   */
  constructor() {
    super(ProfileView, ProfileModel);
    this.events.push(
        {event: Events.ProfilePage.Render.Content, handler: this.view.renderContent},
        {event: Events.ProfilePage.GetContent, handler: this.model.getContent},
        {event: Events.Header.LogOut, handler: this.view.deleteSettingsFromMenu},
        {event: Events.ProfilePage.GetCurrentPageBlocks, handler: this.model.getCurrentPageBlocks},
        {event: Events.ProfilePage.Render.Settings, handler: this.view.renderSettingsPage},
        {event: Events.ProfilePage.Render.Bookmarks, handler: this.view.renderBookmarksPage},
        {event: Events.ProfilePage.Render.Subscriptions, handler: this.view.renderSubscriptionsPage},
        {event: Events.ProfilePage.Render.ReviewsMarks, handler: this.view.renderReviewsMarksPage},
        {event: Events.ProfilePage.ChangeActiveMenuButton, handler: this.view.changeActiveMenuButton},
        {event: Events.ProfilePage.ChangeProfile, handler: this.model.changeProfile},
        {event: Events.ProfilePage.ChangeAvatar, handler: this.model.changeProfileAvatar},
        {event: Events.ProfilePage.ChangedProfile, handler: this.view.reRenderHeader},
        {event: Events.ProfilePage.MoreButton, handler: this.model.changePagAndGetNBlocks},
    );
  }
}
