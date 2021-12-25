// TODO: переименовать на маленькие
export const EVENTS = {
  PathChanged: 'pathChanged',
  RedirectBack: 'redirectBack',
  RedirectForward: 'redirectForward',

  App: {
    Start: 'app:start',
    ErrorPage: 'app:errorPage',
    noAccess: 'app:noAccess',
    ErrorPageText: 'app:errorPageText',
  },
  Router: {
    Go: 'router:go',
  },
  homepage: {
    render: {
      errorPage: 'homepage:renderErrorPage',
      header: 'homepage:renderHeader',
      content: 'homepage:renderContent',
      popularFilms: 'homepage:popularFilms',
    },
    get: {
      infoForHeader: 'homepage:InfoForHeader',
      mainPageContent: 'homepage:getCollections',
    },
  },
  collectionsPage: {
    render: {
      errorPage: 'collectionsPage:renderErrorPage',
      header: 'collectionsPage:renderHeader',
      content: 'collectionsPage:renderContent',
    },
    get: {
      collectionsPageContent: 'collectionsPage:getCollections',
    },
  },
  genresPage: {
    render: {
      errorPage: 'genresPage:renderErrorPage',
      header: 'genresPage:renderHeader',
      content: 'genresPage:renderContent',
    },
    get: {
      genresPageContent: 'genresPage:getGenres',
    },
  },
  genrePage: {
    render: {
      content: 'genrePage:renderContent',
      films: 'genrePage:renderFilms',
      notFoundFilms: 'calendarPage:renderNotFound',
    },
    getPageContent: 'genrePage:getPageContent',
    getFilms: 'genrePage:getFilms',
  },
  calendarPage: {
    render: {
      content: 'calendarPage:renderContent',
      films: 'calendarPage:renderFilms',
      notFoundPremiers: 'calendarPage:renderNotFound',
    },
    getPageContent: 'calendarPage:getPageContent',
    getFilms: 'calendarPage:getFilms',
  },
  AuthPage: {
    Render: {
      Page: 'authPage:render',
      Content: 'authPage:renderContent',
    },
    redirect: 'authPage:redirect',
    RenderError: 'authPage:renderError',
    Submit: 'authPage:submit',
    SuccessLogReg: 'authPage:successLogReg',
    AddValidateError: 'authPage:addValidateError',
    DeleteValidateError: 'authPage:deleteValidateError',
    Validate: 'authPage:validate',
    HavingWrongInput: 'authPage:havingWrongInputs',
    GetContent: 'authPage:getContent',
    deleteAllErrors: 'authPage:deleteAllErrors',
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
      successfulReviewSend: `filmPage:renderSuccessfulReviewSend`
    },
    getPageContent: 'filmPage:getMainPageContent',
    postReview: 'filmPage:postReview',
    postBookmark: 'filmPage:postBookmark',
    postRating: 'filmPage:postRating',
  },
  reviewPage: {
    render: {
      content: 'reviewPage:renderContent',
    },
    getPageContent: 'reviewPage:getReviewPageContent',
  },

  randomPage: {
    render: {
      content: 'randomPage:renderContent',
    },
    getPageContent: 'randomPage:getRandomPageContent',
    submitPressed: 'randomPage:submitPressed',
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
      header: 'header:renderHeader',
    },
    ChangeActiveButton: 'header:changeActiveButton',
    LogOut: 'header:logOut',
    search: 'header:search',
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
    DeleteValidateError: 'profilePage:deleteValidateError',
    HavingWrongInput: 'profilePage:havingWrongInput',
    Validate: 'profilePage:validate',
    RenderError: 'profilePage:renderError',
    deleteAllErrors: 'profilePage:deleteAllErrors',
  },

  searchPage: {
    renderFilmsPersons: 'searchPage:renderFilmsPersons',
    renderEmptyPage: 'searchPage:renderEmptyPage',
    renderFilms: 'searchPage:renderFilms',
    getContent: 'searchPage:getContent',
  },
};
