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
        // {event: EVENTS.reviewPage.getPageContent, handler: this.model.getPageContent},
    );
  }
}
