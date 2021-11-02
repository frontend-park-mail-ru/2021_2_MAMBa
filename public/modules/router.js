import {eventBus} from './eventBus.js';
import {Events} from '../consts/events.js';
import {Routes} from '../consts/routes.js';

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
   */
  constructor(app) {
    this.routes = new Set();
    this.application = app;
    this.currentController = null;
    eventBus.on(Events.PathChanged, this.onPathChanged);
    eventBus.on(Events.RedirectBack, this.back.bind(this));
    eventBus.on(Events.RedirectForward, this.forward.bind(this));

    if (app != null) {
      this.application = app;
      this.application.addEventListener('click', (e) => {
        const target = e.target;
        const closestLink = target.closest('a');
        if (e.target.matches('.scroll-to')) {
          return;
        }
        if (closestLink instanceof HTMLAnchorElement) {
          e.preventDefault();
          const data = {...closestLink.dataset};
          data.path = closestLink.getAttribute('href');
          eventBus.emit(Events.PathChanged, data);
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
    // console.log(path);
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
   * Navigating back through the browser history
   */
  back = () =>{
    window.history.back();
  }

  /**
   * Moving forward through the browser history
   */
  forward=()=> {
    window.history.forward();
  }
}

