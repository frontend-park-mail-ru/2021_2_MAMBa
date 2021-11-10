import {BaseController} from './baseController.js';
import {HeaderModel} from '../models/headerModel.js';
import {HeaderView} from '../views/HeaderView/HeaderView.js';
import {EVENTS} from '../consts/EVENTS';


export class HeaderController extends BaseController {
  constructor() {
    super(HeaderView, HeaderModel);
    this.events.push(
        {event: EVENTS.Header.ChangeActiveButton, handler: this.view.changeActiveButton},
        {event: EVENTS.Authorization.GotUser, handler: this.view.renderUserBlock},
        {event: EVENTS.Router.Go, handler: this.model.compareLinksWithPath},
    );
    this.subscribe();
  }
}
