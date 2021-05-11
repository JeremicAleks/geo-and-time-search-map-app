import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as L from "leaflet";
import {ResultDataEvent} from "../model/result-data-event.model";
import {EventService} from "./event.service";

const musicIcon = L.icon({
  iconUrl: "assets/map-icons/note.ico",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const bookIcon = L.icon({
  iconUrl: "assets/map-icons/book.ico",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const restaurantIcon = L.icon({
  iconUrl: "assets/map-icons/restaurant.ico",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const sportIcon = L.icon({
  iconUrl: "assets/map-icons/soccer.ico",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const filmIcon = L.icon({
  iconUrl: "assets/map-icons/video.ico",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const theatreIcon = L.icon({
  iconUrl: "assets/map-icons/theatre.ico",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private http: HttpClient,public eventService:EventService) { }

  makeMarker(layerGroup: L.LayerGroup,events:ResultDataEvent[]): void {
    layerGroup.clearLayers();
    for(const event of events) {
      const lat = event.geoPoint.lat;
      const lng = event.geoPoint.lon;
      if(event.category === 'MUSIC' ) {
        const marker = L.marker([lat, lng],{icon:musicIcon});
        marker.addTo(layerGroup).on('click',function (e){
          alert(event.description);
        });
      }else if(event.category === 'PERFORMING_ARTS' ) {
        const marker = L.marker([lat, lng],{icon:theatreIcon});
        marker.addTo(layerGroup).on('click',function (e){
          alert(event.description);
        });
      }else if(event.category === 'FILM' ) {
        const marker = L.marker([lat, lng],{icon:filmIcon});
        marker.addTo(layerGroup).on('click',function (e){
          alert(event.description);
        });
      }else if(event.category === 'LECTURES_AND_BOOK' ) {
        const marker = L.marker([lat, lng],{icon:bookIcon});
        marker.addTo(layerGroup).on('click',function (e){
          alert(event.description);
        });
      }else if(event.category === 'FOOD_AND_DRINK' ) {
        const marker = L.marker([lat, lng],{icon:restaurantIcon});
        marker.addTo(layerGroup).on('click',function (e){
          alert(event.description);
        });
      }else if(event.category === 'SPORTS' ) {
        const marker = L.marker([lat, lng],{icon:sportIcon});
        marker.addTo(layerGroup).on('click',function (e){
          alert(event.description);
        });
      }else{
        const marker = L.marker([lat, lng]);
        marker.addTo(layerGroup).on('click',function (e){
          alert(event.description);
        });
      }
    }
  }





}
