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
    this.subscribe();
  }

  subscribe = () => {
    this.eventBus.on(Events.ProfilePage.Render.Content, this.view.renderContent);
    this.eventBus.on(Events.ProfilePage.GetContent, this.model.getContent);
  }

  unsubscribe = () => {
    this.eventBus.off(Events.ProfilePage.Render.Content, this.view.renderContent);
    this.eventBus.off(Events.ProfilePage.GetContent, this.model.getContent);
  }
}
