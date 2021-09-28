import {createElementFromHTML} from '../../utils/utils.js';

const renderCollections = (params) => {
  const template = createElementFromHTML(collections(params));
  return template;
};

export {renderCollections};
