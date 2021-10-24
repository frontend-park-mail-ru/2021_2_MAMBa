import Events from '../consts/events.js';

export class HeaderModel {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.on(Events.Header.GetHeaderContent, this.getHeaderContent);
  }

  getHeaderContent = () => {
  }
}
