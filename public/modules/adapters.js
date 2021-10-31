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
      film_avatar: `${jsonFilm?.poster_url}`,
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
      film_avatar: `${jsonFilm?.poster_url}`,
      description: jsonFilm?.description,
      href: `/film/${jsonFilm.id}`,
    });
    return arrayFilmsWithDescription;
  }, []);
};

/**
 * Union actors and their ids.
 * @param {Object} filmInfoJson - Info about film from json.
 * @return {Object} - Object for render film information
 */
export const convertArrayToFilmPage = (filmInfoJson) => (
    {
      film: convertArrayToFilmInfo(filmInfoJson.film),
      reviews: convertArrayToReviewArrayInFilmPage(filmInfoJson.reviews.review_list),
      recommendations: convertArrayToFilm(filmInfoJson.recommendations.recommendation_list),
    }
);
/**
 * Union actors and their ids.
 * @param {Object} arrayContent - Info about reviews from json.
 * @return {Object} - Object for render list of reviews.
 */
export const convertArrayToReviewArrayInFilmPage = (arrayContent) => {
  return arrayContent.reduce((arrayReview, jsonReview) => {
    arrayReview.push({
      author: jsonReview.author_name,
      href: `/review/${jsonReview.id}`,
      text: jsonReview.text,
      date: jsonReview.date,
      type: jsonReview.review_type,
    });
    return arrayReview;
  }, []);
};
/**
 * Union actors and their ids.
 * @param {Object} arrayContent - Info about films with descriptions from json.
 * @return {Object} - Object for render films with descriptions.
 */
export const convertArrayToFilmInfo = (arrayContent) => {
  let duration = ""
  if (arrayContent.content_type === "film") {
    duration = `${arrayContent.duration} минут`
  } else
    duration = `${arrayContent.duration} сезонов`
  return {
    id: arrayContent?.id,
    title: arrayContent?.title,
    titleOriginal: arrayContent?.title_original,
    countryOriginal: arrayContent?.origin_countries,
    year: arrayContent?.release_year,
    filmAvatar: `${arrayContent?.poster_url}`,
    description: arrayContent?.description,
    rating: arrayContent?.rating,
    duration: duration,
    trailerUrl: arrayContent?.trailer_url,
    totalRevenue: arrayContent?.total_revenue,
    genres: convertArrayToGenresArray(arrayContent?.genres),
    director: convertPersonToFilmPage(arrayContent?.director),
    screenwriter: convertPersonToFilmPage(arrayContent?.screenwriter),
    actors: convertArrayToActorArray(arrayContent?.actors),
  }
};

/**
 * Union actors and their ids.
 * @param {Object} arrayContent - Info about actors from json.
 * @return {Object} - Object for render list of actors.
 */
export const convertArrayToActorArray = (arrayContent) => {
  return arrayContent.reduce((arrayActors, jsonActor) => {
    arrayActors.push({
      name: jsonActor.name_rus,
      href: `/actor/${jsonActor.id}`,
    });
    return arrayActors;
  }, []);
};

/**
 * Union actors and their ids.
 * @param {Object} arrayContent - Info about films`s genres from json.
 * @return {Object} - Object for render list of actors.
 */
export const convertArrayToGenresArray = (arrayContent) => {
  return arrayContent.reduce((arrayGenres, jsonGenre) => {
    arrayGenres.push({
      name: jsonGenre.name,
      href: `/genre/${jsonGenre.genre_id}`,
    });
    return arrayGenres;
  }, []);
};

export const convertPersonToFilmPage = (personaInfoJson) => (
    {
      name: personaInfoJson.name_rus,
      href: `/actor/${personaInfoJson.id}`,
    }
);


/**
 * Union actors and their ids.
 * @param {Object} actorInfoJson - Info about actor from json.
 * @return {Object} - Object for render actor information
 */
export const convertReviewToReviewPage = (reviewInfoJson) => {
  let classType, classButtonType = ""
  if (reviewInfoJson.review_type === 1) {
    classType = "positive-review"
    classButtonType = "positive-button"
  } else if (reviewInfoJson.review_type === 0) {
    classType = "neutral-review"
    classButtonType = "neutral-button"
  } else {
    classType = "negative-review"
    classButtonType = "negative-button"
  }
  return {
    filmName: reviewInfoJson.film_title_ru,
    filmHref: `/film/${reviewInfoJson.film_id}`,
    authorName: reviewInfoJson.author_name,
    authorAvatar: reviewInfoJson.author_picture_url,
    reviewText: reviewInfoJson.review_text,
    classType: classType,
    date: reviewInfoJson.date,
    classButtonType:classButtonType,
  }
};
