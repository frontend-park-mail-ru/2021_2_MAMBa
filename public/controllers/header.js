import { eventBus } from '../modules/eventBus.js';
import Controller from './controller.js';
import { HeaderModel } from '../models/header.js';
import { HeaderView } from '../views/HeaderView/HeaderView.js';

export class HeaderController extends Controller {
  constructor() {
    super();
    this.eventBus = eventBus;
    this.model = new HeaderModel(this.eventBus);
    this.view = new HeaderView(this.eventBus);
  }
}