import {createElementFromHTML, includeStyle} from '../../utils/utils.js';

const renderLoader = (params) => {
  const template = createElementFromHTML(loader(params));
  return template;
};

includeStyle('loader');

export {renderLoader};
