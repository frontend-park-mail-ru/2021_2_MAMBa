import {Events} from '../consts/events.js';
import {headerLinks} from '../consts/header';
import {Model} from './model';

export class HeaderModel extends Model {
  constructor(eventBus) {
    super(eventBus);
  }

  compareLinksWithPath = (path) => {
    const activeLink = headerLinks.find((item) => item.href === path);
    this.eventBus.emit(Events.Header.ChangeActiveButton, activeLink ? activeLink.href : null);
  }
}
