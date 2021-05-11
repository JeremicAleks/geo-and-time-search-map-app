import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventList} from "../../../../model/event-list.model";
import {EventDTO} from "../../../../model/event.model";
import {EventRequestEmitModel} from "../../../../model/event-request-emit.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-page-event-table',
  templateUrl: './admin-page-event-table.component.html',
  styleUrls: ['./admin-page-event-table.component.css']
})
export class AdminPageEventTableComponent implements OnInit {

  @Input() eventData: EventList = new EventList();
  @Input() requestEventsTable: boolean = false;
  @Input() eventTable: boolean = false;
  @Input() pageSize: number;
  @Input() pageIndex: number;

  @Output() approveEvent : EventEmitter<EventRequestEmitModel>;
  @Output() updateEvent : EventEmitter<EventDTO>;
  @Output() deleteEvent: EventEmitter<EventRequestEmitModel>;


  constructor() {
    this.approveEvent = new EventEmitter<EventRequestEmitModel>();
    this.updateEvent = new EventEmitter<EventDTO>();
    this.deleteEvent = new EventEmitter<EventRequestEmitModel>();
  }

  ngOnInit(): void {
  }

  approveEventClicked(event: EventDTO,i:number) {
    let eventRequest: EventRequestEmitModel = new EventRequestEmitModel();
    eventRequest.event = event;
    eventRequest.i = i
    this.approveEvent.emit(eventRequest);
  }

  updateEventClicked(event: EventDTO) {
    this.updateEvent.emit(event);
  }

  deleteEventClicked(event: EventDTO,i: number) {
    let eventRequest: EventRequestEmitModel = new EventRequestEmitModel();
    eventRequest.event = event;
    eventRequest.i = i;
    this.deleteEvent.emit(eventRequest);
  }
}
