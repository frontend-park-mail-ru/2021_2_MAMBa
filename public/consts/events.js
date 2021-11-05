// TODO: переименовать на заглавные
export const Events = {
  PathChanged: 'pathChanged',
  RedirectBack: 'redirectBack',
  RedirectForward: 'redirectForward',
  SliderActions: 'sliderActions',

  Homepage: {
    Render: {
      ErrorPage: 'homepage:renderErrorPage',
      Header: 'homepage:renderHeader',
      Content: 'homepage:renderContent',
    },
    Get: {
      InfoForHeader: 'homepage:InfoForHeader',
      MainPageContent: 'homepage:getCollections',
    },
  },
  ActorPage: {
    Render: {
      Content: 'actorPage:renderContent',
      Films: 'actorPage:renderFilms',
    },
    GetPageContent: 'actorPage:getPageContent',
    GetFilms: 'actorPage:getFilms',
  },
  FilmPage: {
    Render: {
      Content: 'filmPage:renderContent',
    },
    GetPageContent: 'filmPage:getMainPageContent',
  },
};

