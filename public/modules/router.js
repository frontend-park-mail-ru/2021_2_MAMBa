import {eventBus} from './eventBus.js';
import {EVENTS} from '../consts/EVENTS.js';
import {ROUTES} from '../consts/routes.js';

/**
 * Get path arguments
 * @param {string} path - path in which we will look for arguments
 * @param {string} template - path Template
 * @return {object} - returns the found argument from the path
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
   * @param {HTMLElement} app - html of the page.
   */
  constructor(app) {
    this.routes = new Set();
    this.application = app;
    this.currentController = null;
    eventBus.on(EVENTS.PathChanged, this.onPathChanged);
    eventBus.on(EVENTS.RedirectBack, this.back);
    eventBus.on(EVENTS.RedirectForward, this.forward);

    if (app) {
      this.application = app;
      this.application.addEventListener('click', (e) => {
        const target = e.target;
        const closestLink = target.closest('a');
        if (e.target.matches('.scroll-to') || e.target.matches('.not-route')) {
          return;
        }
        if (closestLink instanceof HTMLAnchorElement) {
          e.preventDefault();
          const data = {...closestLink.dataset};
          data.path = closestLink.getAttribute('href');
          eventBus.emit(EVENTS.PathChanged, data);
        }
      });
    }
  }

  /**
   * Registers a path - Adds a path to the router array
   * @param {string} path - The path to add
   * @param {BaseController} controller - The controller that corresponds to this path
   * @return {object} - Return the path
   */
  register(path, controller) {
    this.routes.add({path, controller});
    return this;
  }

  /**
   * On path
   * @param {string} data - The path to add
   */
  onPathChanged = (data) => {
    this.go(data.path);
  }

  /**
   * Start router
   */
  start() {
    window.addEventListener('popstate', () => {
      this.go(window.location.pathname + window.location.search);
    });

    this.go(window.location.pathname + window.location.search);
  }

  /**
   * Get information about path
   * @param {string} path - The path that the user followed
   * @return {object} - Returns path information
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
   * Get path parameters
   * @param {string} path - The path that the user followed
   * @return {Object} - Returns path parameters
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
   * Follow the path
   * @param {string} path - The path that the user followed
   */
  go(path = '/') {
    const routeData = this.getRouteData(path);
    const data = {...routeData};
    if (this.currentController) {
      this.currentController.unsubscribe();
    }
    this.currentController = routeData.controller;
    this.currentController.subscribe();

    if (!this.currentController) {
      path = ROUTES.homePage;
      this.currentController = this.getRouteData(path).controller;
    }

    if (window.location.pathname !== path) {
      window.history.pushState(null, null, path);
    }

    this.currentController.view.render(data);
    eventBus.emit(EVENTS.Router.Go, path);
  }

  /**
   * Navigating back through the browser history
   */
  back = () =>{
    window.history.back();
  }

  /**
   * Moving forward through the browser history
   */
  forward = () => {
    window.history.forward();
  }
}
