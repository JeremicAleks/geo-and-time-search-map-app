import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SimpleQueryModel} from "../../../model/simple-query.model";
import {ResultCity} from "../../../model/result-city.model";
import * as L from "leaflet";
import {ToastrService} from "ngx-toastr";
import {GeoSearchService} from "../../../service/geo-search.service";
import {EventService} from "../../../service/event.service";
import {Router} from "@angular/router";
import {LatLng} from "leaflet";
import {EventDTO} from "../../../model/event.model";

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  simpleQuery: SimpleQueryModel = new SimpleQueryModel();
  resultCity: ResultCity = new ResultCity();

  eventDTO: EventDTO = new EventDTO();

  private map;
  layerGroup = L.layerGroup();


  private initMap(): void {
    this.map = L.map('mapUpdate', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3,
      zoomControl: false
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    });

    this.layerGroup = L.layerGroup().addTo(this.map);

    this.map.on("click", e => {
      this.eventDTO.lat= e.latlng.lat;
      this.eventDTO.lon= e.latlng.lng;
      this.layerGroup.clearLayers();
      L.marker([e.latlng.lat,e.latlng.lng]).addTo(this.layerGroup);
    })

    tiles.addTo(this.map);
  }


  constructor(private toastrServcie:ToastrService,private geoSearch: GeoSearchService,
              private eventService: EventService,private router: Router) { }


  ngOnInit(): void {
    this.initMap();
    this.initUpdateEvent();
  }


  find(simpleQuery: SimpleQueryModel) {
    this.geoSearch.findCity(simpleQuery).subscribe(
      data => {
        this.resultCity = data;
        this.map.setView(new LatLng(this.resultCity.geoPoint.lat,this.resultCity.geoPoint.lon),15);
      },error => {
        console.log(error);
      }
    )

  }

  initUpdateEvent(){
    this.eventDTO = this.eventService.getEventFromStorage();
    this.map.setView(new LatLng(this.eventDTO.lat,this.eventDTO.lon),15);
    L.marker([this.eventDTO.lat,this.eventDTO.lon]).addTo(this.layerGroup);
  }


  updateEvent(event: EventDTO) {
    this.eventService.updateEvent(event).subscribe(
      data => {
        this.router.navigate(['admin/event']);
        this.toastrServcie.success("Events is successfully changed");
      },error => {
        this.toastrServcie.error("Event is not updated!");
      }
    )
  }

  updateDate($event: any) {
    this.eventDTO.eventDate = new Date($event);
  }
}
