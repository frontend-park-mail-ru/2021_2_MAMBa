import {createElementFromHTML, includeStyle} from '../../modules/utils.js';

const renderFooter = (params) => {
  const template = createElementFromHTML(footer(params));
  return template;
};

includeStyle('footer');

export {renderFooter};
