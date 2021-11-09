// TODO: переименовать на заглавные
export const Events = {
  PathChanged: 'pathChanged',
  RedirectBack: 'redirectBack',
  RedirectForward: 'redirectForward',

  App: {
    Start: 'app:start',
    ErrorPage: 'app:errorPage',
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
      WarningRatingSend: 'filmPage:renderWarningRatingSend',
      SuccessfulSend: 'filmPage:renderSuccessfulSend',
      SuccessfulRatingSend: 'filmPage:renderSuccessfulRatingSend',
    },
    GetPageContent: 'filmPage:getMainPageContent',
    PostReview: 'filmPage:postReview',
    PostRating: 'filmPage:postRating',
  },
  ReviewPage: {
    Render: {
      Content: 'reviewPage:renderContent',
    },
    GetPageContent: 'reviewPage:getReviewPageContent',
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
  },

  Authorization: {
    GotUser: 'authorization:gotUser',
    LogOut: 'authorization:logOut',
  },

  ProfilePage: {
    Render: {
      Content: 'profilePage:renderContent',
      Bookmarks: 'profilePage:renderBookmarks',
      ReviewsMarks: 'profilePage:renderReviewsMarks',
      Subscriptions: 'profilePage:renderSubscriptions',
      Settings: 'profilePage:renderSettings',
    },
    MoreButton: 'profilePage:moreButton',
    ChangeActiveMenuButton: 'profilePage:changeActiveMenuButton',
    SubmitSettings: 'profilePage:submitSettings',
    GetCurrentPageBlocks: 'profilePage:getCurrentPageBlocks',
    GetContent: 'profilePage:getContent',
    PrependMenuLinks: 'profilePage:prependMenuLinks',
    NoMoreAvailable: 'profilePage:noMoreAvailable',
    ChangeProfile: 'profilePage:changeProfile',
    ChangedProfile: 'profilePage:changedProfile',
    ChangeAvatar: 'profilePage:changeAvatar',
    ReRenderHeader: 'profilePage:reRenderHeader',
  },
};
