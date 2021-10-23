/**
 * Union actors and their ids.
 * @param {Object} actorInfoJson - Info about actor from json.
* @return {Object} - Object for render actor information
 */
export const convertArrayToActorPage = (actorInfoJson) => (
  {
    ...actorInfoJson,
    date: `${actorInfoJson.born}  ·  ${actorInfoJson.age}`,
    films_to_slide: convertArrayToFilm(actorInfoJson.film_list_with_actor),
    films_with_description:
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
