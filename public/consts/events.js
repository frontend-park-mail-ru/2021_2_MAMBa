export const Events = {
  PathChanged: 'pathChanged',
  RedirectBack: 'redirectBack',
  RedirectForward: 'redirectForward',

  App: {
    Start: 'app:start',
  },

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
    },
    GetPageContent: 'actorPage:getPageContent',
  },

  AuthPage: {
    Render: {
      Page: 'authPage:render',
      Content: 'authPage:renderContent',
    },
    Submit: 'authPage:submit',
    AddValidateError: 'authPage:addValidateError',
    DeleteValidateError: 'authPage:deleteValidateError',
    Validate: 'authPage:validate',
    HavingWrongInput: 'authPage:havingWrongInputs',
    GetRegContent: 'authPage:getRegContent',
    GetAuthContent: 'authPage:getAuthContent',
  },

  Authorization: {
    GotUser: 'authorization:gotUser',
  },

  Header: {
    Render: {
      Content: 'header:renderContent',
    },
    ChangeAuth: 'header:changeAuth',
    GetHeaderContent: 'authPage:getHeaderContent',
    PathChanged: 'header:pathChanged',
    LogOut: 'header:logOut',
  },

  FilmPage: {
    Render: {
      Page: 'filmPage:render',
      Content: 'filmPage:renderContent',
    },
    GetPageContent: 'filmPage:getMainPageContent'
  },
};

export default Events;
