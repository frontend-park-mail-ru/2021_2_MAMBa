import {getCollections} from '../modules/http.js';
import {getCurrentUser} from '../modules/http.js';
import {Events} from '../consts/events.js';
import {Model} from "./model";

export class HomePageModel extends Model {
  constructor(eventBus) {
    super(eventBus);
  }

  getMainPageContent = () => {
    const collections = getCollections();
    Promise.all([collections]).then((values) => {
      const [collectionsValue] = values;
      this.eventBus.emit(Events.Homepage.Render.Content, collectionsValue);
    }).catch(() => {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    });
  }

  getInfoForHeader = () => {
    const data = {
      titleActiveButton: 'Подборки',
      class: 'active-btn',
      authorized: false,
      // userName: userData.first_name,
    }
    this.eventBus.emit(Events.Homepage.Render.Header, data);
    // getCurrentUser().then((idUser) => {
    //   if (idUser) {
    //     const data = {
    //       isAuthorized: true,
    //     };
    //     this.eventBus.emit(Events.Homepage.Render.Header, data);
    //   } else {
    //     const data = {
    //       isAuthorized: false,
    //     };
    //     this.eventBus.emit(Events.Homepage.Render.Header, data);
    //   }
    //
    // }).catch(() => {
    //   this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    // });

  }
}
