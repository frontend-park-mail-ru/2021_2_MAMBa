import {BaseView} from '../BaseView/BaseView.js';
import actorPageContent from '../../components/actor/actor.pug';
import {EVENTS} from '../../consts/EVENTS.js';
import {getPathArgs} from '../../modules/router.js';
import {showMore} from '../../utils/showMore.js';
import {checkShowMoreButton} from '../../utils/showMore.js';
import {setAnchorActions} from '../../utils/anchorAction.js';
import {slider} from '../../utils/slider';

/** Class representing actor page view. */
export class ActorView extends BaseView {
  /**
   * Create actor page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {object} data - Parameters for home page view.
   */
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
  }

  /**
   * Render html actor page from pug template.
   */
  emitGetContent = () => {
    const pathArgs = getPathArgs(window.location.pathname, '/actor/:id');
    this.eventBus.emit(EVENTS.actorPage.getPageContent, pathArgs);
  }

  /**
   * Render content actor page from pug template to content div.
   * @param {Object} data - Contains info about actor.
   */
  renderContent = (data) => {
    console.log(data)
    const template = actorPageContent(data);
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
      setAnchorActions();
      slider('#film-slider');
      checkShowMoreButton(data.moreAvailable, '.button__show-more' );
      showMore(data, '.button__show-more', EVENTS.actorPage.getFilms);
    } else {
      this.eventBus.emit(EVENTS.App.ErrorPage);
    }
  }
}
