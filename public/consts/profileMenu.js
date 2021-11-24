export const menuObjects = {
  bookmarks: {
    href: '/bookmarks',
    name: 'Закладки',
    limit: 6,
  },
  reviewsMarks: {
    href: '/reviews_marks',
    name: 'Отзывы и оценки',
    limit: 6,
  },
  settings: {
    href: '/settings',
    name: 'Настройки',
  },
};

export const menuLinks = {
  menuLinks: [
    menuObjects.bookmarks,
    menuObjects.reviewsMarks,
    menuObjects.settings,
  ]};

export const getMenuLinks = (id) => {
  const regExp = /^\/profile\/\d+/;
  for (const link of menuLinks.menuLinks) {
    if (link.href.match(regExp)) {
      link.href = link.href.replace(regExp, `/profile/${id}`);
    } else {
      link.href = `/profile/${id}` + link.href;
    }
  }
  return menuLinks;
};
