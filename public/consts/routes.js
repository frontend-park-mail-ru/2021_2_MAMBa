export const Routes = {
  homePage: '/',
  collections: '/collections',
  actorPage: '/actor/\\d+', // first \ - экранирования специального символа, а \d+ - десятичное число
  filmPage: '\\/film\\/\\d+',
};

export default Routes;
