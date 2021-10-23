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

/** Class representing a router. */
export class Router {
  /**
   * Create an base router.
   */
  constructor() {
    this.routes = new Set();
    this.currentController = null;
    eventBus.on(Events.PathChanged, this.onPathChanged.bind(this));
    eventBus.on(Events.RedirectBack, this.back.bind(this));
    eventBus.on(Events.RedirectForward, this.forward.bind(this));
  }

  /**
   * Регистрирует путь - добавляет в массив роутеров путь
   * @param {string} path - Путь, который нужно добавить
   * @param {Controller} controller - Контроллер, который соответствует этому пути
   */
  register(path, controller) {
    this.routes.add({path, controller});
  }

  /**
   * При изменении
   * @param {string} data - Путь, который нужно добавить
   */
  onPathChanged(data) {
    this.go(data.path);
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

  /**
   * Получить информацию о пути
   * @param {string} path - Путь, по которому перешел пользователь
   * @return {Object} - Возвращает информацию о пути
   */
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

  /**
   * Получить параметры пути
   * @param {string} path - Путь, по которому перешел пользователь
   * @return {Object} - Возвращает парпметры пути
   */
  getParam(path = '/') {
    const parsedURL = new URL(window.location.origin + path);
    const pathParams = null;
    const resultPath = parsedURL.pathname;

    return {
      path: resultPath,
      pathParams: pathParams,
    };
  }

  /**
   * Перейти по пути
   * @param {string} path - Путь, по которому перешел пользователь
   */
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

