/**
 * Union actors and their ids.
 * @param {Object} actorInfoJson - Info about actor from json.
* @return {Object} - Object for render actor information
 */
export const convertArrayToActorPage = (actorInfoJson) => (
  {
    ...actorInfoJson,
    moreAvailable: actorInfoJson.more_available,
    skip: actorInfoJson.full_actor_current_skip,
    limit: actorInfoJson.full_actor_film_current_limit,
    date: `${actorInfoJson.born}  ·  ${actorInfoJson.age}`,
    filmsToSlide: convertArrayToFilm(actorInfoJson.film_list_with_actor),
    filmsWithDescription:
        convertArrayToFilmWithDescription(actorInfoJson.film_with_description_list),
  }
);

/**
 * Union actors and their ids.
 * @param {Object} arrayContent - Info about collections from json.
 * @return {Object} - Object for render films in carousel.
 */
export const convertArrayToFilm = (arrayContent) => {
  return arrayContent.reduce((arrayFilms, jsonFilm) => {
    arrayFilms.push({
      id: jsonFilm?.id,
      title: jsonFilm?.title,
      film_avatar: `${jsonFilm?.picture_url}`,
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
    skip: actorFilmsJson.full_actor_current_skip,
    limit: actorFilmsJson.full_actor_film_current_limit,
    filmsWithDescription:
          convertArrayToFilmWithDescription(actorFilmsJson.film_with_description_list),
  }
);

/**
 * Union actors and their ids.
 * @param {Object} arrayContent - Info about films with descriptions from json.
 * @return {Object} - Object for render films with descriptions.
 */
export const convertArrayToFilmWithDescription = (arrayContent) => {
  return arrayContent.reduce((arrayFilmsWithDescription, jsonFilm) => {
    arrayFilmsWithDescription.push({
      id: jsonFilm?.id,
      title: jsonFilm?.title,
      year: jsonFilm?.year,
      film_avatar: `${jsonFilm?.picture_url}`,
      description: jsonFilm?.description,
      href: `/film/${jsonFilm.id}`,
    });
    return arrayFilmsWithDescription;
  }, []);
};


