export const Routes = {
  HomePage: '/',
  Collections: '/collections',
  ActorPage: '/actor/\\d+', // first \ - экранирования специального символа, а \d+ - десятичное число
  FilmPage: '\\/film\\/\\d+',
};

export default Routes;
