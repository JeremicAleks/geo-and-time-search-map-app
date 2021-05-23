import {EventDTO} from "./event.model";

export class EventList {
  events: EventDTO[];
  constructor() {
    this.events = [];
  }
}
