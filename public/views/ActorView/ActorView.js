import {ROOT} from '../../main.js';
import {BaseView} from '../BaseView/BaseView.js';

import loader from '../../components/loader/loader.pug';
import actorPageContent from '../../components/actor/actor.pug';
import {Events} from '../../consts/events.js';
import {getPathArgs} from '../../modules/router.js';

/** Class representing actor page view. */
export class ActorView extends BaseView {
  /**
   * Create actor page view.
   * @param {EventBus} eventBus - Global Event Bus.
   * @param {Object}- Parameters for home page view.
   */
  constructor(eventBus, {data = {}} = {}) {
    super(eventBus, data);
    this.eventBus.on(Events.ActorPage.Render.Page, this.render);
    this.eventBus.on(Events.ActorPage.Render.Content, this.renderContent);
  }

  /**
   * Render html favourites page from pug template.
   */
  render = () => {
    const template = loader();
    ROOT.innerHTML = template;
    const pathArgs = getPathArgs(window.location.pathname, '/actor/:id');
    this.eventBus.emit(Events.Homepage.Get.InfoForHeader);
    this.eventBus.emit(Events.ActorPage.GetPageContent, pathArgs);
  }

  /**
   * Render content favourites page from pug template to content div.
   * @param {Object} data - Contains info about actor.
   */
  renderContent = (data) => {
    const template = actorPageContent(data);
    const content = document.querySelector('.content');
    if (content) {
      content.innerHTML = template;
    } else {
      this.eventBus.emit(Events.Homepage.Render.ErrorPage);
    }
  }
}
