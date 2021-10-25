import {getCollections} from '../modules/http.js';
import {Events} from '../consts/events.js';

/** Class representing home page model.
 */
export class HomePageModel {
  /**
   * Create a actor page model.
   * @param {EventBus} eventBus - Global Event Bus.
   */
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on(Events.Homepage.Get.MainPageContent, this.getMainPageContent);
    this.eventBus.on(Events.Homepage.Get.InfoForHeader, this.getInfoForHeader);
  }

  getMainPageContent = () => {
    const promise = new Promise((resolve, reject) => {
      const collections = getCollections();
      resolve(collections);
    });
    promise.then((data) => {
      this.eventBus.emit(Events.Homepage.Render.Content, data);
    }).catch(() => {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    });
  }

  getInfoForHeader = () => {
    const data = {
      titleActiveButton: 'Подборки',
      class: 'active-btn',
      authorized: false,
    };
    this.eventBus.emit(Events.Homepage.Render.Header, data);
  }
}
