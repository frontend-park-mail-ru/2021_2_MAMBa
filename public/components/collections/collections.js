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
