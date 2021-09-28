import {createElementFromHTML, includeStyle} from '../../modules/utils.js';

const renderHeader = (params) => {
  const template = createElementFromHTML(header(params));
  const loginBtn = template.querySelector('.login-btn');
  loginBtn.addEventListener('click', () => {
    window.location.href = '/login';
  });
  return template;
};

includeStyle('header');

export {renderHeader};
