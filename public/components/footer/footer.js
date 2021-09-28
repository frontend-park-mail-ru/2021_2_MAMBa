import {createElementFromHTML, includeStyle} from '../../utils/utils.js';

const renderFooter = (params) => {
  const template = createElementFromHTML(footer(params));
  return template;
};

includeStyle('footer');

export {renderFooter};
