import Events from '../consts/events.js';
import {headerLinks} from '../consts/header';
import {Model} from "./model";

export class HeaderModel extends Model {
  constructor(eventBus) {
    super(eventBus);
  }

  compareLinksWithPath = (path) => {
    console.log('compare');
    console.log(path);
    for (let link of headerLinks) {
      if (link.href === path) {
        this.eventBus.emit(Events.Header.ChangeActiveButton, link.href);
        return;
      }
    }
    this.eventBus.emit(Events.Header.ChangeActiveButton, null);
  }
}
