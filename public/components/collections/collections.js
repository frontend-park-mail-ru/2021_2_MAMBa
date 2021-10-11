// import {createElementFromHTML} from '../../utils/utils.js';
//
// const renderCollections = (params) => {
//   const template = createElementFromHTML(collections(params));
//   return template;
// };
//
// export {renderCollections};
//

export class CollectionsComponent {
  constructor({
                parent = document.body,
                data = [],
              } = {}) {
    this._parent = parent;
    this._data = data;
  }

  render() {
    const template = puglatizer.components.Collections.Collections();
    this._parent.innerHTML = template;
  }
}