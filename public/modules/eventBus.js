class EventBus {
  constructor() {
    this._listeners = {};
  }

  /**
   подписываемся на событие
   */
  on(event, callback) {
    (this._listeners[event] || (this._listeners[event] = new Map())).set(callback.name, callback);
  }

  /**
   отписываемся от события
   */
  off(event, callback) {
    this._listeners[event] = this._listeners[event]?.delete(callback.name);
  }

  /**
   публикуем (диспатчим, эмитим) событие
   */
  emit(event, ...data) {
    this._listeners[event]?.forEach((listener) => listener(...data));
  }
}

export const eventBus = new EventBus();
