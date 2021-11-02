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
 * @param {object} arrayContent - Info about collections from json.
 * @return {object} - Object for render films in carousel.
 */
export const convertArrayToFilm = (arrayContent) => {
  return arrayContent.map( (jsonFilm) => {
    const filmPopular ={};
    filmPopular.id= jsonFilm?.id;
    filmPopular.title= jsonFilm?.title;
    filmPopular.filmAvatar= `${jsonFilm?.poster_url}`;
    filmPopular.href= `/films/${jsonFilm.id}`;
    return filmPopular;
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
  return arrayContent.map((jsonFilm) => {
    const filmWithDescription ={};
    filmWithDescription.id= jsonFilm?.id;
    filmWithDescription.title= jsonFilm?.title;
    filmWithDescription.description= jsonFilm?.description;
    filmWithDescription.year= jsonFilm?.year;
    filmWithDescription.filmAvatar= `${jsonFilm?.poster_url}`;
    filmWithDescription.href= `/films/${jsonFilm?.id}`;
    return filmWithDescription;
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
      href: `/reviews/${jsonReview.id}`,
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
  let duration;
  if (arrayContent.content_type === 'фильм') {
    duration = `${arrayContent.duration} минут`;
  } else {
    duration = `${arrayContent.duration} сезонов`;
  }
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
    director: arrayContent?.director.name_rus,
    screenwriter: arrayContent?.screenwriter.name_rus,
    actors: convertArrayToActorArray(arrayContent?.cast),
  };
};

/**
 * Union actors and their ids.
 * @param {Object} arrayContent - Info about actors from json.
 * @return {Object} - Object for render list of actors.
 */
export const convertArrayToActorArray = (arrayContent) => {
  return arrayContent.map((jsonActor) => {
    const actors = {};
    actors.name = jsonActor.name_rus;
    actors.href = `/actors/${jsonActor.id}`;
    return actors;
  }, []);
};

/**
 * Union actors and their ids.
 * @param {Object} arrayContent - Info about films`s genres from json.
 * @return {Object} - Object for render list of actors.
 */
export const convertArrayToGenresArray = (arrayContent) => {
  return arrayContent.map((jsonGenre) => {
    const arrayGenres = {};
    arrayGenres.name = jsonGenre.name;
    arrayGenres.href = `/genres/${jsonGenre.genre_id}`;
    return arrayGenres;
  }, []);
};

/**
 * Union actors and their ids.
 * @param {Object} reviewInfoJson - Info about actor from json.
 * @return {Object} - Object for render actor information
 */
export const convertReviewToReviewPage = (reviewInfoJson) => {
  let classType;
  let classButtonType;
  if (reviewInfoJson.review_type === 1) {
    classType = 'positive-review';
    classButtonType = 'positive-button';
  } else if (reviewInfoJson.review_type === 0) {
    classType = 'neutral-review';
    classButtonType = 'neutral-button';
  } else {
    classType = 'negative-review';
    classButtonType = 'negative-button';
  }
  return {
    filmName: reviewInfoJson.film_title_ru,
    filmHref: `/films/${reviewInfoJson.film_id}`,
    authorName: reviewInfoJson.author_name,
    authorAvatar: reviewInfoJson.author_picture_url,
    reviewText: reviewInfoJson.review_text,
    classType: classType,
    date: reviewInfoJson.date,
    classButtonType: classButtonType,
  };
};
