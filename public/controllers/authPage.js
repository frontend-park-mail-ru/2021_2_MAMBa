import { eventBus } from '../modules/eventBus.js';
import Controller from './controller.js';
import { AuthPageModel } from '../models/authPage.js';
import { AuthView } from '../views/AuthView/AuthView.js';

export class AuthPageController extends Controller {
  constructor() {
    super();
    this.eventBus = eventBus;
    this.model = new AuthPageModel(this.eventBus);
    this.view = new AuthView(this.eventBus);
  }
}