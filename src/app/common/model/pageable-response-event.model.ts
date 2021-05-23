import {EventList} from "./event-list.model";

export class PageableResponseEvent {
  totalElements: number;
  totalPages: number;
  eventListDTO: EventList;

  constructor() {
    this.totalElements = null;
    this.totalPages = null;
    this.eventListDTO = new EventList();
  }
}
