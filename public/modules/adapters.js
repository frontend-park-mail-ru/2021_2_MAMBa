/**
 * Union actors and their ids.
 * @param {object} fullActorInfoJson - Info about actor from json.
 * @return {object} - Object for render actor information
 */
export const convertArrayToActorPage = (fullActorInfoJson) => (
  {
    actor: convertActorToActorPage(fullActorInfoJson.actor),
    moreAvailable: fullActorInfoJson.films.more_available,
    skip: fullActorInfoJson.films.current_skip,
    limit: fullActorInfoJson.films.current_limit,
    filmsWithDescription:
          convertArrayToFilmWithDescription(fullActorInfoJson.films.film_list),
    filmsToSlide: convertArrayToFilm(fullActorInfoJson.popular_films.film_list),
  }
);

/**
 * Union actors and their ids.
 * @param {object} collectionsInfoJson - Info about actor from json.
 * @return {object} - Object for render actor information
 */
export const convertArrayToCollectionsPage = (collectionsInfoJson) => (
  {
    collections: convertArrayToCollection(collectionsInfoJson.collections_list),
    moreAvailable: collectionsInfoJson.more_available,
    skip: collectionsInfoJson.current_skip,
    limit: collectionsInfoJson.current_limit,
  }
);

/**
 * Union collection information
 * @param {object} arrayContent - Info about collections from json.
 * @return {object} - Object for render collections information
 */
export const convertArrayToCollection = (arrayContent) => {
  return arrayContent.map((jsonCollection) => {
    return {
      title: jsonCollection?.title,
      collectionAvatar: `https://film4u.club${jsonCollection?.picture_url}`,
      href: `/collections/${jsonCollection.id}`,
    };
  });
};

/**
 * Union actor information
 * @param {object} actorInfoJson - Info about actor from json.
 * @return {object} - Object for render actor information
 */
export const convertActorToActorPage = (actorInfoJson) => (
  {
    name: actorInfoJson.name_rus,
    nameEnglish: actorInfoJson.name_en,
    avatar: `https://film4u.club${actorInfoJson.picture_url}`,
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
  return arrayContent.map((jsonFilm) => {
    return {
      id: jsonFilm?.id,
      title: jsonFilm?.title,
      filmAvatar: `https://film4u.club${jsonFilm?.poster_url}`,
      href: `/films/${jsonFilm.id}`,
    };
  });
};


/**
 * Union actors and their ids.
 * @param {object} actorFilmsJson - Films with the actor from json.
 * @return {object} - Object for render actor information
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
    return {
      id: jsonFilm.id,
      title: jsonFilm.title,
      description: jsonFilm?.description || '-',
      year: jsonFilm?.release_year || '-',
      filmAvatar: `https://film4u.club${jsonFilm.poster_url}`,
      href: `/films/${jsonFilm.id}`,
    };
  });
};
/**
 * Union actors and their ids.
 * @param {object} filmInfoJson - Info about film from json.
 * @return {object} - Object for render film information
 */
export const convertArrayToFilmPage = (filmInfoJson) => (
  {
    film: convertArrayToFilmInfo(filmInfoJson.film),
    reviews: convertArrayToReviewArrayInFilmPage(filmInfoJson.reviews.review_list),
    recommendations: convertArrayToFilm(filmInfoJson.recommendations.recommendation_list),
    myRating: filmInfoJson.my_review.stars|| 1,
    myReview : convertReviewToReviewPage(filmInfoJson.my_review)
  }
);
/**
 * Union actors and their ids.
 * @param {object} arrayContent - Info about reviews from json.
 * @return {object} - Object for render list of reviews.
 */
export const convertArrayToReviewArrayInFilmPage = (arrayContent) => {
  return arrayContent.map((jsonReview) => {
    return {
      author: jsonReview.author_name,
      href: `/reviews/${jsonReview.id}`,
      text: jsonReview.review_text,
      date: jsonReview.date,
      type: jsonReview.review_type,
    };
  });
};
/**
 * Union actors and their ids.
 * @param {object} arrayContent - Info about films with descriptions from json.
 * @return {object} - Object for render films with descriptions.
 */
export const convertArrayToFilmInfo = (arrayContent) => {
  const duration = (arrayContent.content_type === 'film') ?
      `${arrayContent.duration} минут` : `${arrayContent.duration} сезонов`;
  const rating = (!(arrayContent.rating%1)||arrayContent.rating===10)?`${arrayContent.rating}.0`:arrayContent.rating;
  return {
    ...arrayContent,
    titleOriginal: arrayContent?.title_original,
    countryOriginal: arrayContent?.origin_countries,
    year: arrayContent?.release_year || '-',
    filmAvatar: `https://film4u.club${arrayContent.poster_url}`,
    duration: duration,
    rating: rating,
    trailerUrl: arrayContent.trailer_url,
    totalRevenue: arrayContent.total_revenue,
    genres: convertArrayToGenresArray(arrayContent?.genres) || '-',
    director: arrayContent?.director.name_rus || '-',
    screenwriter: arrayContent?.screenwriter.name_rus || '-',
    actors: convertArrayToActorArray(arrayContent?.cast) || '-',
  };
};

/**
 * Union actors and their ids.
 * @param {object} arrayContent - Info about actors from json.
 * @return {object} - Object for render list of actors.
 */
export const convertArrayToActorArray = (arrayContent) => {
  return arrayContent.map((jsonActor) => {
    return {
      name: jsonActor.name_rus,
      href: `/actors/${jsonActor.id}`,
    };
  });
};

/**
 * Union actors and their ids.
 * @param {object} arrayContent - Info about films`s genres from json.
 * @return {object} - Object for render list of actors.
 */
export const convertArrayToGenresArray = (arrayContent) => {
  return arrayContent.map((jsonGenre) => {
    return {
      name: jsonGenre.name,
      href: `/genres/${jsonGenre.genre_id}`,
    };
  });
};

/**
 * Union review.
 * @param {object} reviewInfoJson - Info about review from json.
 * @return {object} - Object for render review information
 */
export const convertReviewToReviewPage = (reviewInfoJson) => {
  let classType = 0;
  let classButtonType;
  if (reviewInfoJson.review_type === 1) {
    classType = 'negative-review';
    classButtonType = 'negative-button';
  } else if (reviewInfoJson.review_type === 2) {
    classType = 'neutral-review';
    classButtonType = 'neutral-button';
  } else if (reviewInfoJson.review_type === 3) {
    classType = 'positive-review';
    classButtonType = 'positive-button';
  }
  console.log(reviewInfoJson.date)
  return {
    classType: classType,
    classButtonType: classButtonType,
    authorAvatar: `https://film4u.club${reviewInfoJson?.author_picture_url}`,
    filmTitle: reviewInfoJson?.film_title_ru,
    authorName: reviewInfoJson?.author_name,
    reviewText: reviewInfoJson.review_text || 0,
    date: reviewInfoJson.date,
  };
};

/**
 * Union collection.
 * @param {object} collectionInfoJson - Info about collection from json.
 * @return {object} - Object for render collection information
 */
export const convertCollectionToCollectionPage = (collectionInfoJson) => (
  {
    name: collectionInfoJson.collection.collection_name,
    description: collectionInfoJson.collection.description,
    id: collectionInfoJson.collection.id,
    filmsWithDescription:
          convertArrayToFilmWithDescription(collectionInfoJson.films),
  }
);
