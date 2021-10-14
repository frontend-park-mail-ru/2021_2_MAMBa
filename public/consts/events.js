export const Events = {
  PathChanged: 'pathChanged',
  RedirectBack: 'redirectBack',
  RedirectForward: 'redirectForward',

  Homepage: {
    Render: {
      Page: 'homepage:render',
      ErrorPage: 'homepage:renderErrorPage',
      Header: 'homepage:renderHeader',
      Content: 'homepage:renderContent',
      Footer: 'homepage:renderFooter',
    },
    Get: {
      InfoForHeader: 'homepage:InfoForHeader',
      MainPageContent: 'homepage:getCollections',
    },
  },

};

export default Events;
