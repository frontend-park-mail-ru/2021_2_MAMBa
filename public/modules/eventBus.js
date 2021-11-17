/** Class representing event bus, need for MVC model. */
class EventBus {
  /**
   * Create event bus with empty listeners.
   */
  constructor() {
    this._listeners = {};
  }

  /**
   * Subscribe event to event bus.
   * @param {string} event - Name of new event.
   * @param {function} callback - Callback function.
   */
  on(event, callback) {
    console.log('on', event);
    (this._listeners[event] || (this._listeners[event] = new Set())).add(callback);
  }

  /**
   * Unsubscribe event from event bus.
   * @param {string} event - Name of event.
   * @param {function} callback - Callback function.
   */
  off(event, callback) {
    console.log('off', event);
    this._listeners[event]?.delete(callback);
  }

  /**
   * Emit event from event bus.
   * @param {string} event - Name of event.
   * @param {any} data - Data for callback function.
   */
  emit(event, ...data) {
    console.log('emit', event);
    this._listeners[event]?.forEach((listener) => listener(...data));
  }
}

export const eventBus = new EventBus();
