const createElementFromHTML = (html) => {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.firstChild;
};

export {createElementFromHTML};
