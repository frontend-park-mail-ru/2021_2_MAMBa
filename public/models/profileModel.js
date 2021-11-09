import {Events} from '../consts/events.js';
import {Model} from './model';
import {authModule} from '../modules/authorization';
import {getProfile} from '../modules/http';

export class ProfileModel extends Model {
  constructor(eventBus) {
    super(eventBus);
  }

  getContent = () => {
    if (!authModule.user) {
      this.eventBus.emit(Events.PathChanged, '/');
      return;
    }
    getProfile().then((response) => {
      if (!response) {
        return;
      }
      if (response.status === 200) {
        this.eventBus.emit(Events.ProfilePage.Render.Content, response.body);
      }
    });
  }
}
