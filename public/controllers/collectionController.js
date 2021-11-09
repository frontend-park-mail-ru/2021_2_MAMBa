import {BaseController} from './baseController.js';
import {CollectionPageModel} from '../models/collectionModel.js';
import {CollectionView} from '../views/CollectionView/CollectionView.js';
import {Events} from '../consts/events';

/** Class representing collection page controller. */
export class CollectionPageController extends BaseController {
  /**
   * Create an actor page controller.
   */
  constructor() {
    super(CollectionView, CollectionPageModel);
    this.subscribe();
  }

  subscribe = () => {
    this.eventBus.on(Events.collectionPage.getPageContent, this.model.getPageContent);
    this.eventBus.on(Events.collectionPage.render.content, this.view.renderContent);
  }

  unsubscribe = () => {
    this.eventBus.off(Events.collectionPage.getPageContent, this.model.getPageContent);
    this.eventBus.off(Events.collectionPage.render.Content, this.view.renderContent);
  }
}
