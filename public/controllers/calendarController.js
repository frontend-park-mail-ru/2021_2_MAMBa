import {BaseController} from './baseController.js';
import {EVENTS} from '../consts/EVENTS';
import {CalendarPageModel} from "../models/calendarModel";
import {CalendarView} from "../views/CalendarView/CalendarView";

/** Class representing genre page controller. */
export class CalendarPageController extends BaseController {
  /**
   * Create an genre page controller.
   */
  constructor() {
    super(CalendarView, CalendarPageModel);
    this.events.push(
        {event: EVENTS.calendarPage.render.content, handler: this.view.renderContent},
        {event: EVENTS.calendarPage.getPageContent, handler: this.model.getPageContent},
        {event: EVENTS.calendarPage.getFilms, handler: this.model.getCalendarFilmsContent},
        {event: EVENTS.calendarPage.render.films, handler: this.view.renderFilms},
    );
  }
}
