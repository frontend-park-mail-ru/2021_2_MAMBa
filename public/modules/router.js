import {eventBus} from './eventBus.js';
import {Events} from '../consts/events.js';
import Routes from '../consts/routes.js';

export function getPathArgs(path, template) {
  console.log("in router");
  if (!template) return {};
  const splitPath = path.split('/');

  const pathArgs = template
      .split('/')
      .reduce((args, propName, index) => {
        if (propName.startsWith(':')) {
          args[propName.slice(1)] = splitPath[index];
        }

        return args;
      }, {});

  return pathArgs;
}

class Router {
  constructor(app) {
    this.application = app;
    this.routes = [];
    this.currentController = null;

    eventBus.on(Events.PathChanged, this.onPathChanged.bind(this));
    eventBus.on(Events.RedirectBack, this.back.bind(this));
    eventBus.on(Events.RedirectForward, this.forward.bind(this));

    document.getElementById('root').addEventListener('click', (e) => {
      console.log("in router");
      if (e.target.dataset.routlink) {
        e.preventDefault();
        this.changeRoute(e.target.dataset.routlink);
      }
    });

    this.application.addEventListener('click', (e) => {
      console.log("in router");
      const target = e.target;
      const closestLink = target.closest('a');

      if (closestLink instanceof HTMLAnchorElement) {
        e.preventDefault();

        const data = {...closestLink.dataset};

        data.path = closestLink.getAttribute('href');

        eventBus.emit(Events.PathChanged, data);
      }
    });
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * Регистрирует путь - добавляет в массив роутеров путь
   */
  register(path, controller) {
    console.log("in router1");
    const routeObject = {
      path,
      controller,
    };

    this.routes.push(routeObject);
    return this;
  }

  onPathChanged(data) {
    console.log("in router");
    this.go(data.path, data || {});
  }

  start() {
    console.log("in router2");
    console.log(window.location.search);
    window.addEventListener('popstate', () => {
      this.go(window.location.pathname + window.location.search);
    });

    this.go(window.location.pathname + window.location.search);
  }

  getRouteData(path) {
    console.log("in router3");
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
    console.log("in router4");
    const data = {};
    const parsedURL = new URL(window.location.origin + path);
    const pathParams = null;
    const resultPath = parsedURL.pathname;

    return {
      path: resultPath,
      pathParams: pathParams,
      data,
    };
  }

  go(path = '/', data = {}) {
    console.log("in router go");
    const routeData = this.getRouteData(path);
    data = {...data, ...routeData};
    console.log(data);
    console.log(this.routes);

    this.currentController = routeData.controller;

    if (!this.currentController) {
      path = Routes.HomePage;
      this.currentController = this.getRouteData(path).controller;
    }

    if (window.location.pathname !== path) {
      window.history.pushState(null, null, path);
    }


    this.currentController.view.render(data);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }
}

export default Router;
