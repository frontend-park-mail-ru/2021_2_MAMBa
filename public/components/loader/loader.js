import {createElementFromHTML} from '../../utils/utils.js';

const renderLoader = (params) => {
  const template = createElementFromHTML(loader(params));
  return template;
};

export {renderLoader};
