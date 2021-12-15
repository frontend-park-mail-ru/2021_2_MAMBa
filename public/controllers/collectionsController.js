import {BaseController} from './baseController.js';
import {EVENTS} from '../consts/EVENTS';
import {CollectionsPageModel} from '../models/collectionsModel';
import {CollectionsPageView} from '../views/CollectionsView/CollectionsView';

/** Class representing home page controller. */
export class CollectionsPageController extends BaseController {
  /**
   * Create an home page controller.
   */
  constructor() {
    super(CollectionsPageView, CollectionsPageModel);
    this.events.push(
        {event: EVENTS.collectionsPage.get.mainPageContent, handler: this.model.getCollectionsPageContent},
        {event: EVENTS.collectionsPage.render.content, handler: this.view.renderContent},
    );
  }
}
