import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AddEvent} from "../model/add-event.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {EventDTO} from "../model/event.model";
import {PageableRequest} from "../model/pageable-request.model";


const EVENTSTORAGE = "eventStorage";

const categories = ["SPORTS","MUSIC","VISUAL_ARTS","PERFORMING_ARTS","FILM","LECTURES_AND_BOOK","FASHION","FOOD_AND_DRINK","FESTIVALS_AND_FAIRS","CHARITIES","KIDS_AND_FAMILY","MUSEUM","TOURIST_ATTRACTION","OTHER"];

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

  public pageableGetEventUserUsername(pageableRequest:PageableRequest): Observable<any> {
    return this.http.post(environment.baseUrl+ 'api/event/pageableUser',pageableRequest);
  }

  public getImagesFromEvent(id: number): Observable<any> {
    return this.http.get(environment.baseUrl+'api/event/images/'+id);
  }

  public deleteImage(id:number): Observable<any> {
    return this.http.delete(environment.baseUrl+'api/event/imageDelete/'+id);
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

  getCategories(){
    return categories;
  }




}
