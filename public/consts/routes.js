export const Routes = {
  HomePage: '/',
  Collections: '/collections',
  ActorPage: '/actor/\\d+', // first \ - экранирования специального символа, а \d+ - десятичное число
  FilmPage: '\\/film\\/\\d+',
  AuthPage: '/auth',
};

export default Routes;
