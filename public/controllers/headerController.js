import {BaseController} from './baseController.js';
import {HeaderModel} from '../models/headerModel.js';
import {HeaderView} from '../views/HeaderView/HeaderView.js';
import {Events} from '../consts/events';


export class HeaderController extends BaseController {
  constructor() {
    super(HeaderView, HeaderModel);
    this.events.push(
        {event: Events.Header.ChangeActiveButton, handler: this.view.changeActiveButton},
        {event: Events.Authorization.GotUser, handler: this.view.renderUserBlock},
        {event: Events.Router.Go, handler: this.model.compareLinksWithPath},
    );
    this.subscribe();
  }
}
