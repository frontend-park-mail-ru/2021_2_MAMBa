import {getCollections} from '../modules/http.js';
import {getCurrentUser} from '../modules/http.js';
import {Events} from '../consts/events.js';

export class HomePageModel {
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
    }).catch((error) => {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    });


    // const collections = getCollections();
    // console.log("in collection model");
    // Promise.all([collections]).then((values) => {
    //   const [collectionsValue] = values;
    //   this.eventBus.emit(Events.Homepage.Render.Content, collectionsValue);
    // }).catch(() => {
    //   console.log("error in GetCollections");
    //   this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    // });
    // Promise.all([collections]).then((values) => {
    //   const [collectionsValue] = values;
    //   this.eventBus.emit(Events.Homepage.Render.Content, collectionsValue);
    // }).catch(() => {
    //   console.log("error in GetCollections");
    //   this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    // });
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
