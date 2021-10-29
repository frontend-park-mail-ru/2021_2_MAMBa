export const Events = {
  PathChanged: 'pathChanged',
  RedirectBack: 'redirectBack',
  RedirectForward: 'redirectForward',
  SliderActions: 'sliderActions',

  App: {
    Start: 'app:start',
  },

  Router: {
    Go: 'router:go',
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
    SuccessLogReg: 'authPage:successLogReg',
    AddValidateError: 'authPage:addValidateError',
    DeleteValidateError: 'authPage:deleteValidateError',
    Validate: 'authPage:validate',
    HavingWrongInput: 'authPage:havingWrongInputs',
    GetContent: 'authPage:getContent',
  },

  Authorization: {
    GotUser: 'authorization:gotUser',
    LogOut: 'authorization:logOut',
  },

  Header: {
    Render: {
      Content: 'header:renderContent',
    },
    ChangeActiveButton: 'header:changeActiveButton',
  },

  FilmPage: {
    Render: {
      Page: 'filmPage:render',
      Content: 'filmPage:renderContent',
    },
    GetPageContent: 'filmPage:getMainPageContent',
  },

  ProfilePage: {
    Render: {
      Content: 'profilePage:renderContent',
    },
    GetContent: 'profilePage:getContent',
  },
};
