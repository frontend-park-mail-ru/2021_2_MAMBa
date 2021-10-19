export const arrayContentToActorPageContent = (actorInfoJson) => (
    {
      // name: actorInfoJson.first_name + ' ' + actorInfoJson.last_name,
      born: actorInfoJson.born,
      // actor_avatar: actorInfoJson.actor_avatar,
      // movies: arrayContentToNewFilmsSeries(actorInfoJson.movies),
    }
);
// export const arrayContentToActorPageContent = (actorInfoJson) => (
//     {
//         name_rus: actorInfoJson.name_rus,
//         // name_en: actorInfoJson.name_en,
//         // career: actorInfoJson.career,
//         // height: actorInfoJson.height,
//         // born: actorInfoJson.born,
//         // age: actorInfoJson.age,
//         // birth_place: actorInfoJson.birth_place,
//         // gender: actorInfoJson.gender,
//         // family_status: actorInfoJson.family_status,
//         // film_number: actorInfoJson.film_number,
//         // actor_avatar: actorInfoJson.actor_avatar,
//         // films: arrayContentFilms(actorInfoJson.film_list_with_actor),
//         // films_with_description: arrayContentFilmsWithDescription(actorInfoJson.film_list_with_actor),
//     }
// );

// export const arrayContentFilms = (arrayContent) => {
//     return arrayContent.reduce((arrayFilms, jsonFilm) => {
//         arrayFilms.push({
//             id: jsonFilm?.id,
//             title: jsonFilm?.title,
//             film_avatar: `${jsonFilm?.picture_url}`,
//             href: `/movie/${jsonFilm.id}`
//         });
//         return arrayFilms;
//     }, []);
// };
//
// export const arrayContentFilmsWithDescription = (arrayContent) => {
//     return arrayContent.reduce((arrayFilmsWithDescription, jsonFilm) => {
//         arrayFilmsWithDescription.push({
//             id: jsonFilm?.id,
//             title: jsonFilm?.title,
//             film_avatar: `${jsonFilm?.picture_url}`,
//             description:`${jsonFilm?.description}`,
//             href: `/movie/${jsonFilm.id}`
//         });
//         return arrayFilmsWithDescription;
//     }, []);
// };
