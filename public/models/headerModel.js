import {EVENTS} from '../consts/EVENTS.js';
import {headerLinks} from '../consts/header';
import {Model} from './model';

export class HeaderModel extends Model {
  constructor(eventBus) {
    super(eventBus);
  }

  compareLinksWithPath = (path) => {
    const activeLink = headerLinks.find((item) => item.href === path);
    this.eventBus.emit(EVENTS.Header.ChangeActiveButton, activeLink ? activeLink.href : null);
  }
}
