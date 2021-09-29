import {createElementFromHTML} from '../../utils/utils.js';

const renderAuth = (params) => {
  const template = createElementFromHTML(auth(params));
  const content = document.createElement('div');
  content.className = 'auth-content';
  content.appendChild(template);
  return content;
};

export {renderAuth};
