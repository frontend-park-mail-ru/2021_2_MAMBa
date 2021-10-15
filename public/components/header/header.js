export class HeaderComponent {
  constructor({
                parent = document.body,
                data = [],
              } = {}) {
    this._parent = parent;
    this._data = data;
  }

  render() {
    const template = puglatizer.components.header.header();
    this._parent.innerHTML = template;
  }
}
