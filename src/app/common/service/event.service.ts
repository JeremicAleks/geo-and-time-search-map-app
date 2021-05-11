import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AddEvent} from "../model/add-event.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {EventDTO} from "../model/event.model";
import {PageableRequest} from "../model/pageable-request.model";


const EVENTSTORAGE = "eventStorage";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  event:EventDTO = new EventDTO();

  constructor(private http:HttpClient) { }

  public getOneEvent(id:number): Observable<any> {
    return this.http.get(environment.baseUrl+'api/event/'+id);
  }

  public saveEvent(addEvent:AddEvent) : Observable<any> {
    return this.http.post(environment.baseUrl + 'api/event', addEvent);
  }

  public getAllEvents() : Observable<any> {
    return this.http.get(environment.baseUrl+'api/event');
  }

  public getAllApproved(): Observable<any> {
    return this.http.get(environment.baseUrl + 'management/api/event/approved');
  }

  public getAllRequested(): Observable<any> {
    return this.http.get(environment.baseUrl + 'management/api/event/requested');
  }

  public approveEvent(event:EventDTO): Observable<any> {
    return this.http.post(environment.baseUrl + 'api/event/approve',event);
  }

  public updateEvent(event:EventDTO): Observable<any> {
    return this.http.put(environment.baseUrl+'api/event',event);
  }

  public uploadImage(id:number,uploadImageData: FormData) : Observable<any> {
    return this.http.post(environment.baseUrl+ 'api/event/upload/'+id,uploadImageData);
  }

  public pageableGetEvent(pageableRequest:PageableRequest): Observable<any> {
    return this.http.post(environment.baseUrl+ 'api/event/pageable',pageableRequest);
  }

  public deleteEvent(id:number): Observable<any> {
    return this.http.delete(environment.baseUrl + 'api/event/'+id);
  }

  getEventFromStorage(): EventDTO {
    this.event = new EventDTO();
    if (window.localStorage[EVENTSTORAGE]) {
      this.event = JSON.parse(window.localStorage[EVENTSTORAGE]);
    }
    return this.event;
  }
  saveEventInStorage(model: EventDTO) {
    window.localStorage.removeItem(EVENTSTORAGE);
    window.localStorage.setItem(EVENTSTORAGE, JSON.stringify(model));
  }



}
