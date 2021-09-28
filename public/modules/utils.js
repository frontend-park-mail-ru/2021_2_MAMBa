const createElementFromHTML = (html) => {
  const tempParent = document.createElement('div');
  tempParent.innerHTML = html;
  return tempParent.firstChild;
};

const includeStyle = (name) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `/components/${name}/${name}.css`;
  document.head.appendChild(link);
};

export {createElementFromHTML, includeStyle};
