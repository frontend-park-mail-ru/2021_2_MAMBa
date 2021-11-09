import {BaseController} from './baseController.js';
import {CollectionPageModel} from '../models/collectionModel.js';
import {CollectionView} from '../views/CollectionView/CollectionView.js';
import {EVENTS} from '../consts/EVENTS';

/** Class representing collection page controller. */
export class CollectionPageController extends BaseController {
  /**
   * Create an actor page controller.
   */
  constructor() {
    super(CollectionView, CollectionPageModel);
    this.events.push(
        {event: EVENTS.collectionPage.getPageContent, handler: this.model.getPageContent},
        {event: EVENTS.collectionPage.render.content, handler: this.view.renderContent},
    );
  }
}
