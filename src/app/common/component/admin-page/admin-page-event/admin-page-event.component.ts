import { Component, OnInit } from '@angular/core';
import {EventService} from "../../../service/event.service";
import {EventList} from "../../../model/event-list.model";
import {EventDTO} from "../../../model/event.model";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {PageableRequest} from "../../../model/pageable-request.model";
import {ToastrService} from "ngx-toastr";
import {EventRequestEmitModel} from "../../../model/event-request-emit.model";

@Component({
  selector: 'app-admin-page-event',
  templateUrl: './admin-page-event.component.html',
  styleUrls: ['./admin-page-event.component.css']
})
export class AdminPageEventComponent implements OnInit {

  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;
  eventList: EventList = new EventList();

  constructor(private eventService: EventService,private router:Router,
              private toastrService: ToastrService) { }


  ngOnInit(): void {
    this.getAllApproved();
  }

  getAllApproved(){
    let pageableRequest: PageableRequest = new PageableRequest();
    pageableRequest.page= this.pageIndex;
    pageableRequest.size= this.pageSize;
    pageableRequest.flagFilter = true;
    this.eventService.pageableGetEvent(pageableRequest).subscribe(
      data=> {
        this.length = data.totalElements;
        this.eventList = data.eventListDTO;
      }
    )
  }

  updateTable(event: EventDTO) {
    this.eventService.saveEventInStorage(event);
    this.router.navigate(['admin/event/update']);
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    let pageableRequest: PageableRequest = new PageableRequest();
    pageableRequest.page= event.pageIndex;
    pageableRequest.size= event.pageSize;
    pageableRequest.flagFilter =  true;

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
