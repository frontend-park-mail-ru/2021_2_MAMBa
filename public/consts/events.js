export const Events = {
  PathChanged: 'pathChanged',
  RedirectBack: 'redirectBack',
  RedirectForward: 'redirectForward',
  SliderActions: 'sliderActions',

  Homepage: {
    Render: {
      Page: 'homepage:render',
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
      Page: 'actorPage:render',
      Content: 'actorPage:renderContent',
      Films: 'actorPage:renderFilms',
    },
    GetPageContent: 'actorPage:getPageContent',
    GetFilms: 'actorPage:getFilms',
  },
  FilmPage: {
    Render: {
      Page: 'filmPage:render',
      Content: 'filmPage:renderContent',
    },
    GetPageContent: 'filmPage:getMainPageContent',
  },
};

