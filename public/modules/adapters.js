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
    countFilmsWithDescription: fullActorInfoJson?.films.film_total || 0,
    filmsToSlide: convertArrayToFilm(fullActorInfoJson.popular_films.film_list),
    countFilmsToSlide: fullActorInfoJson?.popular_films.film_total || 0,
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
      collectionAvatar: `https://park.film4u.club${jsonCollection?.picture_url}`,
      href: `/collections/${jsonCollection.id}`,
    };
  });
};

/**
 * Union actors and their ids.
 * @param {object} bannersInfoJson - Info about banners from json.
 * @return {object} - Object for render actor information
 */
export const convertArrayToHomeMainSliderPage = (bannersInfoJson) => (
  {
    banners: convertArrayToMainSlider(bannersInfoJson.banners_list),
  }
);
/**
 * Union actors and their ids.
 * @param {object} filmsInfoJson - Info about actor from json.
 * @return {object} - Object for render actor information
 */
export const convertArrayToHomePopularFilmsPage = (filmsInfoJson) => (
  {
    popularFilms: convertArrayToFilm(filmsInfoJson.film_list),
  }
);
/**
 * Union collection information
 * @param {object} arrayContent - Info about collections from json.
 * @return {object} - Object for render collections information
 */
export const convertArrayToMainSlider = (arrayContent) => {
  const arr = arrayContent.map(function(jsonBanner) {
    return {
      title: jsonBanner?.title,
      description: jsonBanner?.description,
      poster: `https://park.film4u.club${jsonBanner?.picture_url}`,
      href: jsonBanner?.link|| '',
    };
  });
  // arr.push(arr[0], arr[1], arr[2], arr[3]);
  arr.push(arr[0], arr[1], arr[0], arr[1], arr[0], arr[1]);
  return arr;
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
    avatar: `https://park.film4u.club${actorInfoJson.picture_url}`,
    heightMetre: `${actorInfoJson.height} ??`,
    date: `${actorInfoJson.birthday}  ??  ${actorInfoJson.age} ??????`,
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
      filmAvatar: `https://park.film4u.club${jsonFilm?.poster_url}`,
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
export const convertArrayToGenreFilmWithDescription = (arrayContent) => {
  return arrayContent.map((jsonFilm) => {
    return {
      id: jsonFilm.id,
      title: jsonFilm.title,
      originalTitle: jsonFilm?.title_original || '',
      description: jsonFilm?.description || '-',
      year: jsonFilm?.release_year || '-',
      filmAvatar: `https://film4u.club${jsonFilm.poster_url}`,
      href: `/films/${jsonFilm.id}`,
      rating: jsonFilm?.rating|| '-',
    };
  });
};

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
      originalTitle: jsonFilm?.title_original || '',
      description: jsonFilm?.description || '-',
      year: jsonFilm?.release_year || '-',
      filmAvatar: `https://film4u.club${jsonFilm.poster_url}`,
      href: `/films/${jsonFilm.id}`,
      rating: ratingNewNumber(jsonFilm?.rating) || '-',
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
    myRating: filmInfoJson.my_review?.stars || 1,
    myReview: convertReviewToReviewPage(filmInfoJson.my_review),
    bookmarked: filmInfoJson.bookmarked,
  }
);

/**
 * Union actors and their ids.
 * @param {object} filmInfoJson - Info about reviews from json.
 * @return {object} - Object for render film information
 */
export const convertArrayToUpdateReviews = (filmInfoJson) => (
  {
    reviews: convertArrayToReviewArrayInFilmPage(filmInfoJson.review_list),
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
 * Convert rating for stars.
 * @param {number} rating - rating of film.
 */
export const ratingNumber = (rating) => {
  return (!(rating % 1) && rating !== 10) ?
      `${rating}.0` : rating;
};

/**
 * Convert rating for stars.
 * @param {number} rating - rating of film.
 */
export const ratingNewNumber = (rating) => {
  if (typeof rating === 'number') {
    return rating.toFixed(1);
  } else {
    return rating;
  }
};

/**
 * Union actors and their ids.
 * @param {object} arrayContent - Info about films with descriptions from json.
 * @return {object} - Object for render films with descriptions.
 */
export const convertArrayToFilmInfo = (arrayContent) => {
  const duration = (arrayContent.content_type === 'film') ?
      `${arrayContent.duration} ??????????` : `${arrayContent.duration} ??????????????`;
  return {
    ...arrayContent,
    titleOriginal: arrayContent?.title_original,
    countryOriginal: arrayContent?.origin_countries,
    year: arrayContent?.release_year || '-',
    filmAvatar: `https://film4u.club${arrayContent.poster_url}`,
    duration: duration,
    rating: arrayContent?.rating || '-',
    trailerUrl: arrayContent?.trailer_url || '-',
    totalRevenue: arrayContent.total_revenue,
    genres: convertArrayToGenresArray(arrayContent?.genres) || '-',
    director: arrayContent?.director.name_rus || '-',
    directorHref: `/actors/${arrayContent.director.id}`,
    screenwriter: arrayContent?.screenwriter.name_rus || '-',
    screenwriterHref: `/actors/${arrayContent.screenwriter.id}`,
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
 * Union genres of the film.
 * @param {object} arrayContent - Info about films`s genres from json.
 * @return {object} - Object for render list of actors.
 */
export const convertArrayToGenresArray = (arrayContent) => {
  return arrayContent.map((jsonGenre) => {
    return {
      name: jsonGenre.name,
      href: `/genres/${jsonGenre.id}`,
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
  if (reviewInfoJson?.review_type === 1) {
    classType = 'negative-review';
    classButtonType = 'negative-button';
  } else if (reviewInfoJson?.review_type === 2) {
    classType = 'neutral-review';
    classButtonType = 'neutral-button';
  } else if (reviewInfoJson?.review_type === 3) {
    classType = 'positive-review';
    classButtonType = 'positive-button';
  }

  return {
    href: `/profile/${reviewInfoJson?.author_id}`,
    classType: classType,
    classButtonType: classButtonType,
    authorAvatar: `https://film4u.club${reviewInfoJson?.author_picture_url}`,
    filmTitle: reviewInfoJson?.film_title_ru,
    authorName: `?????????? ${reviewInfoJson?.author_name}`,
    reviewText: reviewInfoJson?.review_text || 0,
    date: reviewInfoJson?.date,
  };
};

/**
 * Union collection.
 * @param {object} collectionInfoJson - Info about collection from json.
 * @return {object} - Object for render collection information
 */
export const convertCollectionToCollectionPage = (collectionInfoJson) => (
  {
    name: `${collectionInfoJson.collection.collection_name}`,
    description: collectionInfoJson.collection.description,
    id: collectionInfoJson.collection.id,
    filmsWithDescription:
          convertArrayToFilmWithDescription(collectionInfoJson.films),
  }
);

/**
 * Union actors and their ids.
 * @param {object} genres - Info about genres from json.
 * @return {object} - Object for render genres information
 */
export const convertArrayToGenres = (genres) => {
  return genres.map((jsonGender) => {
    return {
      title: jsonGender?.name,
      genreAvatar: `https://film4u.club${jsonGender?.picture_url}` || '',
      href: `/genres/${jsonGender.id}`,
    };
  });
};

/**
 * Union genres.
 * @param {object} genresInfoJson - Info about genres from json.
 * @return {object} - Object for render genres information
 */
export const convertArrayToGenresPage = (genresInfoJson) => (
  {
    genres: convertArrayToGenres(genresInfoJson.genres_list),
  }
);

/**
 * Union genre.
 * @param {object} genreInfoJson - Info about genre from json.
 * @return {object} - Object for render genre information
 */
export const convertArrayToGenrePage = (genreInfoJson) => (
  {
    filmsTotal: genreInfoJson.films.film_total,
    id: genreInfoJson.id,
    genreName: `${genreInfoJson.name}`,
    moreAvailable: genreInfoJson?.more_available || false,
    skip: genreInfoJson.current_skip,
    limit: genreInfoJson.current_limit,
    filmsWithDescription:
          convertArrayToGenreFilmWithDescription(genreInfoJson.films.film_list),
  }
);

/**
 * Make name of month from text.
 * @param {string} month - Number of the month.
 * @return {array} - Array of month`s name
 */
const monthToText = (month) => {
  let monthName = ['-', '-'];
  switch (month) {
    case '01':
      monthName = ['????????????', '????????????'];
      break;
    case '02':
      monthName = ['??????????????', '??????????????'];
      break;
    case '03':
      monthName = ['??????????', '????????'];
      break;
    case '04':
      monthName = ['????????????', '????????????'];
      break;
    case '05':
      monthName = ['??????', '??????'];
      break;
    case '06':
      monthName = ['????????', '????????'];
      break;
    case '07':
      monthName = ['????????', '????????'];
      break;
    case '08':
      monthName = ['??????????????', '????????????'];
      break;
    case '09':
      monthName = ['????????????????', '????????????????'];
      break;
    case '10':
      monthName = ['??????????????', '??????????????'];
      break;
    case '11':
      monthName = ['????????????', '????????????'];
      break;
    case '12':
      monthName = ['??????????????', '??????????????'];
      break;
  }
  return (monthName);
};

/**
 * Union actor`s film.
 * @param {object} arrayContent - Info about films with descriptions from json.
 * @return {object} - Object for render films with descriptions.
 */
export const convertArrayToPremierFilms = (arrayContent) => {
  return arrayContent.map((jsonFilm) => {
    const data = jsonFilm?.premiere_ru || '';
    let yearNumber;
    let monthText;
    let dayNumber;
    if (data) {
      const splitDate = data.split(/[ \-]/);
      yearNumber = splitDate[0];
      const monthNumber = splitDate[1];
      dayNumber = splitDate[2];
      const month = monthToText(monthNumber);
      monthText = month[0];
    } else {
      yearNumber = '-';
      monthText = '-';
      dayNumber = '-';
    }
    return {
      id: jsonFilm.id,
      title: jsonFilm.title,
      titleOriginal: jsonFilm?.title_original || '',
      rating: jsonFilm?.rating || '-',
      description: jsonFilm?.description || '-',
      year: yearNumber,
      month: monthText,
      day: dayNumber,
      filmAvatar: `https://film4u.club${jsonFilm.poster_url}`,
      href: `/films/${jsonFilm.id}`,
    };
  });
};

/**
 * Convert premieres.
 * @param {object} calendarInfoJson - Info about premieres from json.
 * @param {number} year - Year of premieres from json.
 * @param {number} month - Month of premieres from json.
 * @return {object} - Object for premieres c information
 */
export const convertArrayToCalendarPage = (calendarInfoJson, year, month) => {
  return {
    dateCalendar: convertDateToCalendarPage(month, year),
    year: year,
    month: month,
    premieres: convertArrayToPremierFilms(calendarInfoJson.film_list),
  };
};

/**
 * Convert date.
 * @param {number} month - Month of premieres from json.
 * @param {number} year - Year of premieres from json.
 * @return {object} - Object for render date
 */
export const convertDateToCalendarPage = (month, year) => {
  if (month < 10) {
    month = '0' + month;
  }
  const monthText = monthToText('' + month);
  return `${monthText[1]}, ${year}`;
};

