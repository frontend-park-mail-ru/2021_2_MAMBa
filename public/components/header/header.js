import {createElementFromHTML} from '../../utils/utils.js';

const renderHeader = (params) => {
  const template = createElementFromHTML(header(params));
  return template;
};

export {renderHeader};
