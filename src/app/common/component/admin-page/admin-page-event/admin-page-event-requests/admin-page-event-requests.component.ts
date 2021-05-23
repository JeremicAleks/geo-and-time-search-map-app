import { Component, OnInit } from '@angular/core';
import {EventList} from "../../../../model/event-list.model";
import {EventService} from "../../../../service/event.service";
import {EventDTO} from "../../../../model/event.model";
import {ToastrService} from "ngx-toastr";
import {EventRequestEmitModel} from "../../../../model/event-request-emit.model";
import {PageableRequest} from "../../../../model/pageable-request.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-page-event-requests',
  templateUrl: './admin-page-event-requests.component.html',
  styleUrls: ['./admin-page-event-requests.component.css']
})
export class AdminPageEventRequestsComponent implements OnInit {

  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;
  eventList: EventList = new EventList();

  constructor(private eventService: EventService,private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllRequested();
  }

  getAllRequested(){
    let pageableRequest: PageableRequest = new PageableRequest();
    pageableRequest.page= this.pageIndex;
    pageableRequest.size= this.pageSize;
    pageableRequest.flagFilter = false;
    this.eventService.pageableGetEvent(pageableRequest).subscribe(
      data=> {
        this.length = data.totalElements;
        this.eventList = data.eventListDTO;
      }
    )

  }

  approveEvent(event: EventRequestEmitModel) {
    this.eventService.approveEvent(event.event).subscribe(
      data=> {
        this.toastrService.success("Event is approved");
        this.eventList.events.splice(event.i,1);
        this.length -= 1;
      }
    )
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    let pageableRequest: PageableRequest = new PageableRequest();
    pageableRequest.page= event.pageIndex;
    pageableRequest.size= event.pageSize;
    pageableRequest.flagFilter =  false;

    this.eventService.pageableGetEvent(pageableRequest).subscribe(
      data => {
        this.eventList = data.eventListDTO;
      }
    )
  }

  deleteEvent(event: EventRequestEmitModel) {
    this.eventService.deleteEvent(event.event.id).subscribe(
      data=> {
        this.toastrService.success("Event is deleted");
        this.eventList.events.splice(event.i,1);
        this.length -= 1;
      }
    )
  }
}
