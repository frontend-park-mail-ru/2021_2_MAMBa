import {eventBus} from './eventBus.js';
import {Events} from '../consts/events.js';
import {Routes} from '../consts/routes.js';

/**
 * Получить параметры из пути
 * @param {string} path - Путь, в котором будем искать аргументы
 * @param {string} template - Шаблон пути
 * @return {Object} - Возвращает найденный аргумент из пути
 */
export const getPathArgs = (path, template) => {
  if (!template) return {};
  const splitPath = path.split('/');

  return template
      .split('/')
      .reduce((args, propName, index) => {
        if (propName.startsWith(':')) {
          args[propName.slice(1)] = splitPath[index];
        }
        return args;
      }, {});
};

export class Router {
  constructor(app) {
    this.routes = new Set();
    this.currentController = null;

    eventBus.on(Events.PathChanged, this.onPathChanged.bind(this));
    eventBus.on(Events.RedirectBack, this.back.bind(this));
    eventBus.on(Events.RedirectForward, this.forward.bind(this));
  }

  /**
   * Регистрирует путь - добавляет в массив роутеров путь
   * @return {this}
   * @param {string} path - Путь, который нужно добавить
   * @param {Controller} controller - Контроллер, который соответствует этому пути
   */
  register(path, controller) {
    this.routes.add({path, controller});
    return this;
  }

  onPathChanged(data) {
    this.go(data.path, data || {});
  }
  /**
   * Запустить роутер
   */
  start() {
    window.addEventListener('popstate', () => {
      this.go(window.location.pathname + window.location.search);
    });

    this.go(window.location.pathname + window.location.search);
  }

  getRouteData(path) {
    let targetController = null;
    const result = this.getParam(path);

    this.routes.forEach(({path, controller}) => {
      const res = result.path.match(path);
      if (res) {
        targetController = controller;
      }
    });

    return {
      controller: targetController,
      data: result.data,
      path: {
        path: result.path,
        resourceId: +result.pathParams,
      },
    };
  }

  getParam(path = '/') {
    const parsedURL = new URL(window.location.origin + path);
    const pathParams = null;
    const resultPath = parsedURL.pathname;

    return {
      path: resultPath,
      pathParams: pathParams,
    };
  }

  go(path = '/') {
    const routeData = this.getRouteData(path);
    const data = {...routeData};
    this.currentController = routeData.controller;

    if (!this.currentController) {
      path = Routes.homePage;
      this.currentController = this.getRouteData(path).controller;
    }

    if (window.location.pathname !== path) {
      window.history.pushState(null, null, path);
    }

    this.currentController.view.render(data);
  }
  /**
   * Переход назад по истории браузера
   */
  back() {
    window.history.back();
  }
  /**
   * Переход вперёд по истории браузера
   */
  forward() {
    window.history.forward();
  }
}

