/**
 * Union actors and their ids.
 * @param {object} fullActorInfoJson - Info about actor from json.
 * @return {object} - Object for render actor information
 */
export const convertArrayToActorPage = (fullActorInfoJson) => (
  {
    actor: convertActorToActorPage(fullActorInfoJson.actor),
    moreAvailable: fullActorInfoJson.films.film_list.more_available,
    skip: fullActorInfoJson.films.current_skip,
    limit: fullActorInfoJson.films.current_limit,
    filmsWithDescription:
          convertArrayToFilmWithDescription(fullActorInfoJson.films.film_list),
    filmsToSlide: convertArrayToFilm(fullActorInfoJson.popular_films.film_list),
  }
);

/**
 * Union actor information
 * @param {Object} actorInfoJson - Info about actor from json.
* @return {Object} - Object for render actor information
 */
export const convertActorToActorPage = (actorInfoJson) => (
  {
    name: actorInfoJson.name_rus,
    nameEnglish: actorInfoJson.name_en,
    avatar: actorInfoJson.picture_url,
    heightMetre: `${actorInfoJson.height} м`,
    date: `${actorInfoJson.birthday}  ·  ${actorInfoJson.age}`,
    filmTotal: actorInfoJson.film_number,
    ...actorInfoJson,
  }
);

/**
 * Union popular actor`s films.
 * @param {Object} arrayContent - Info about collections from json.
 * @return {Object} - Object for render films in carousel.
 */
export const convertArrayToFilm = (arrayContent) => {
  return arrayContent.reduce((arrayFilms, jsonFilm) => {
    arrayFilms.push({
      id: jsonFilm?.id,
      title: jsonFilm?.title,
      filmAvatar: `${jsonFilm?.poster_url}`,
      href: `/film/${jsonFilm.id}`,
    });
    return arrayFilms;
  }, []);
};


/**
 * Union actors and their ids.
 * @param {Object} actorFilmsJson - Films with the actor from json.
 * @return {Object} - Object for render actor information
 */
export const convertArrayToActorFilms = (actorFilmsJson) => (
  {
    moreAvailable: actorFilmsJson.more_available,
    skip: actorFilmsJson.current_skip,
    limit: actorFilmsJson.current_limit,
    filmsWithDescription:
          convertArrayToFilmWithDescription(actorFilmsJson.film_list),
  }
);

/**
 * Union actor`s film.
 * @param {object} arrayContent - Info about films with descriptions from json.
 * @return {object} - Object for render films with descriptions.
 */
export const convertArrayToFilmWithDescription = (arrayContent) => {
  return arrayContent.reduce((arrayFilmsWithDescription, jsonFilm) => {
    arrayFilmsWithDescription.push({
      id: jsonFilm?.id,
      title: jsonFilm?.title,
      year: jsonFilm?.year,
      filmAvatar: `${jsonFilm?.poster_url}`,
      description: jsonFilm?.description,
      href: `/film/${jsonFilm.id}`,
    });
    return arrayFilmsWithDescription;
  }, []);
};
