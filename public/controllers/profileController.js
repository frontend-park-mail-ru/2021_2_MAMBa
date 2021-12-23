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
        {event: EVENTS.App.noAccess, handler: this.view.renderNoAccess},
        {event: EVENTS.ProfilePage.getContent, handler: this.model.getContent},
        {event: EVENTS.Header.LogOut, handler: this.view.deleteSettingsFromMenu},
        {event: EVENTS.authorization.gotUser, handler: this.model.checkSettingsPage},
        {event: EVENTS.ProfilePage.Render.Content, handler: this.view.renderContent},
        {event: EVENTS.authorization.notLoggedIn, handler: this.model.checkSettingsPage},
        {event: EVENTS.ProfilePage.redirectToReviews, handler: this.model.redirectToReviews},
        {event: EVENTS.ProfilePage.addSettingsToMenu, handler: this.view.addSettingsToMenu},
        {event: EVENTS.ProfilePage.GetCurrentPageBlocks, handler: this.model.getCurrentPageBlocks},
        {event: EVENTS.ProfilePage.Render.Settings, handler: this.view.renderSettingsPage},
        {event: EVENTS.ProfilePage.Render.Bookmarks, handler: this.view.renderBookmarksPage},
        {event: EVENTS.ProfilePage.Render.Subscriptions, handler: this.view.renderSubscriptionsPage},
        {event: EVENTS.ProfilePage.Render.ReviewsMarks, handler: this.view.renderReviewsMarksPage},
        {event: EVENTS.ProfilePage.ChangeActiveMenuButton, handler: this.view.changeActiveMenuButton},
        {event: EVENTS.ProfilePage.ChangeProfile, handler: this.model.changeProfile},
        {event: EVENTS.ProfilePage.ChangedProfile, handler: this.view.reRenderHeader},
        {event: EVENTS.ProfilePage.MoreButton, handler: this.model.changePagAndGetNBlocks},
        {event: EVENTS.ProfilePage.AddValidateError, handler: this.view.addErrorMessage},
        {event: EVENTS.ProfilePage.DeleteValidateError, handler: this.view.deleteErrorMessage},
        {event: EVENTS.ProfilePage.HavingWrongInput, handler: this.view.animateWrongInput},
        {event: EVENTS.ProfilePage.Validate, handler: this.model.validateOneInput},
        {event: EVENTS.ProfilePage.RenderError, handler: this.view.addNotAuthorizedMessage},
        {event: EVENTS.ProfilePage.deleteAllErrors, handler: this.model.deleteAllErrorsFromInput},
    );
  }
}
