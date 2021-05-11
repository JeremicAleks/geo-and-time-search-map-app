import {EventDTO} from "./event.model";

export class EventRequestEmitModel {
  event: EventDTO;
  i: number;
  constructor() {
    this.event = new EventDTO();
    this.i = 0;
  }
}
