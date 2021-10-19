export class ActorComponent {
  constructor({
                parent = document.body,
                data = [],
              } = {}) {
    this._parent = parent;
    this._data = data;
  }

  render() {
    const template = puglatizer.components.ActorPage.ActorPage();
    this._parent.innerHTML = template;
  }
}
