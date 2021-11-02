// TODO: переименовать на заглавные
export const Events = {
  PathChanged: 'pathChanged',
  RedirectBack: 'redirectBack',
  RedirectForward: 'redirectForward',

  App: {
    Start: 'app:start',
  },
  Router: {
    Go: 'router:go',
  },
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
      WarningSend: 'filmPage:renderWarningSend',
      SuccessfulSend: 'filmPage:renderSuccessfulSend',
    },
    GetPageContent: 'filmPage:getMainPageContent',
    PostReview: 'filmPage:postReview',
  },
  ReviewPage: {
    Render: {
      Page: 'reviewPage:render',
      Content: 'reviewPage:renderContent',
    },
    GetPageContent: 'reviewPage:getReviewPageContent',
  },

  Header: {
    Render: {
      Content: 'header:renderContent',
    },
    ChangeActiveButton: 'header:changeActiveButton',
  },

  Authorization: {
    GotUser: 'authorization:gotUser',
    LogOut: 'authorization:logOut',
  },

  ProfilePage: {
    Render: {
      Content: 'profilePage:renderContent',
    },
    GetContent: 'profilePage:getContent',
  },
};

