export class BaseView {
    constructor(eventBus, { data = {} } = {}) {
        this._data = data;
        this.eventBus = eventBus;
    }
}
