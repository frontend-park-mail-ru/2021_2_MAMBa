// TODO: переименовать на маленькие
export const EVENTS = {
  PathChanged: 'pathChanged',
  RedirectBack: 'redirectBack',
  RedirectForward: 'redirectForward',

  App: {
    Start: 'app:start',
    ErrorPage: 'app:errorPage',
    noAccess: 'app:noAccess',
  },
  Router: {
    Go: 'router:go',
  },
  homepage: {
    render: {
      page: 'homepage:render',
      errorPage: 'homepage:renderErrorPage',
      header: 'homepage:renderHeader',
      content: 'homepage:renderContent',
    },
    get: {
      infoForHeader: 'homepage:InfoForHeader',
      mainPageContent: 'homepage:getCollections',
    },
  },
  AuthPage: {
    Render: {
      Page: 'authPage:render',
      Content: 'authPage:renderContent',
    },
    RenderError: 'authPage:renderError',
    Submit: 'authPage:submit',
    SuccessLogReg: 'authPage:successLogReg',
    AddValidateError: 'authPage:addValidateError',
    DeleteValidateError: 'authPage:deleteValidateError',
    Validate: 'authPage:validate',
    HavingWrongInput: 'authPage:havingWrongInputs',
    GetContent: 'authPage:getContent',
  },
  actorPage: {
    render: {
      content: 'actorPage:renderContent',
      films: 'actorPage:renderFilms',
    },
    getPageContent: 'actorPage:getPageContent',
    getFilms: 'actorPage:getFilms',
  },
  filmPage: {
    render: {
      content: 'filmPage:renderContent',
      warningSend: 'filmPage:renderWarningSend',
      warningRatingSend: 'filmPage:renderWarningRatingSend',
      successfulSend: 'filmPage:renderSuccessfulSend',
      successfulRatingSend: 'filmPage:renderSuccessfulRatingSend',
    },
    getPageContent: 'filmPage:getMainPageContent',
    postReview: 'filmPage:postReview',
    postRating: 'filmPage:postRating',
  },
  reviewPage: {
    render: {
      content: 'reviewPage:renderContent',
    },
    getPageContent: 'reviewPage:getReviewPageContent',
  },

  collectionPage: {
    render: {
      content: 'collectionPage:renderContent',
    },
    getPageContent: 'reviewPage:getCollectionPageContent',
  },

  Header: {
    Render: {
      Content: 'header:renderContent',
    },
    ChangeActiveButton: 'header:changeActiveButton',
    LogOut: 'header:logOut',
  },

  authorization: {
    gotUser: 'authorization:gotUser',
    changedUser: 'authorization:changedUser',
    notLoggedIn: 'authorization:notLoggedIn',
    logOutUser: 'authorization:logOutUser',
  },

  ProfilePage: {
    Render: {
      Content: 'profilePage:renderContent',
      Bookmarks: 'profilePage:renderBookmarks',
      ReviewsMarks: 'profilePage:renderReviewsMarks',
      Subscriptions: 'profilePage:renderSubscriptions',
      Settings: 'profilePage:renderSettings',
    },
    redirectToReviews: 'profilePage:redirectToReviews',
    addSettingsToMenu: 'profilePage:addSettingsToMenu',
    MoreButton: 'profilePage:moreButton',
    ChangeActiveMenuButton: 'profilePage:changeActiveMenuButton',
    SubmitSettings: 'profilePage:submitSettings',
    GetCurrentPageBlocks: 'profilePage:getCurrentPageBlocks',
    getContent: 'profilePage:getContent',
    PrependMenuLinks: 'profilePage:prependMenuLinks',
    NoMoreAvailable: 'profilePage:noMoreAvailable',
    ChangeProfile: 'profilePage:changeProfile',
    ChangedProfile: 'profilePage:changedProfile',
  },
};
