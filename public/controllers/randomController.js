import {BaseController} from './baseController.js';
import {RandomModel} from '../models/randomModel';
import {RandomView} from '../views/RandomView/RandomView';
import {EVENTS} from '../consts/EVENTS';

/** Class representing review page controller. */
export class RandomController extends BaseController {
  /**
   * Create an review page controller.
   */
  constructor() {
    super(RandomView, RandomModel);
    this.events.push(
        {event: EVENTS.randomPage.getPageContent, handler: this.model.getPageContent},
        {event: EVENTS.randomPage.render, handler: this.view.renderContent},
    );
  }
}
