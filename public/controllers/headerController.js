import {BaseController} from './baseController.js';
import {HeaderModel} from '../models/headerModel.js';
import {HeaderView} from '../views/HeaderView/HeaderView.js';
import {EVENTS} from '../consts/EVENTS';


export class HeaderController extends BaseController {
  constructor() {
    super(HeaderView, HeaderModel);
    this.events.push(
        {event: EVENTS.Header.ChangeActiveButton, handler: this.view.changeActiveButton},
        {event: EVENTS.authorization.gotUser, handler: this.view.renderUserBlock},
        {event: EVENTS.authorization.changedUser, handler: this.view.renderUserBlock},
        {event: EVENTS.PathChanged, handler: this.view.hideVerticalMenu},
        {event: EVENTS.PathChanged, handler: this.view.showNavAndHideSearch},
        {event: EVENTS.Router.Go, handler: this.model.compareLinksWithPath},
        {event: EVENTS.Header.Render.header, handler: this.view.addEventListenerToSearch},
        {event: EVENTS.Header.Render.header, handler: this.view.addEventListenerToResize},
        {event: EVENTS.Header.Render.header, handler: this.view.addEventListenerToVerticalMenu},
    );
    this.subscribe();
  }
}
