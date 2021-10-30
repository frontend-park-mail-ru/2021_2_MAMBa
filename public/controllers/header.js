import {BaseController} from './baseController.js';
import {HeaderModel} from '../models/header.js';
import {HeaderView} from '../views/HeaderView/HeaderView.js';
import {Events} from '../consts/events';


export class HeaderController extends BaseController {
  constructor() {
    super(HeaderView, HeaderModel);
    this.subscribe();
  }
  subscribe = () => {
    this.eventBus.on(Events.Header.ChangeActiveButton, this.view.changeActiveButton);
    this.eventBus.on(Events.Authorization.GotUser, this.view.renderUserBlock);
    this.eventBus.on(Events.Router.Go, this.model.compareLinksWithPath);
  }
  unsubscribe = () => {
    this.eventBus.off(Events.Header.ChangeActiveButton, this.view.changeActiveButton);
    this.eventBus.off(Events.Router.Go, this.model.compareLinksWithPath);
    this.eventBus.off(Events.Authorization.GotUser, this.view.renderUserBlock);
  }
}
