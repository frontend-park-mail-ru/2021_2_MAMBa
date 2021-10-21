const createElementFromHTML = (html) => {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.firstChild;
}

const diffSet = (setA, setB) => {
  return new Set([...setA].filter(x => !setB.has(x)));
}

const intersectSet = (setA, setB) => {
  return new Set([...setA].filter(x => setB.has(x)));
}



export {createElementFromHTML, diffSet, intersectSet};
