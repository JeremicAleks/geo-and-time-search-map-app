import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from "../common/service/marker.service";
import {findCity} from "../common/mock/cities.mock";


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [15, 21],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  text:String;

  private map;
  layerGroup = L.layerGroup();


  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.layerGroup = L.layerGroup().addTo(this.map);
    // this.markerService.makeMaker(this.map);
  }

  ns() {
  }

  search(text: String) {
    let resultData:ResultDataDto = findCity(text);
    this.map.setView(new L.LatLng(resultData.lat,resultData.lng), 15);
    let coordinates: ICoordinates[] = [];
    for(const event of resultData.events){
      let c:ICoordinates = { lat:0 , lng: 0};
      c.lng=event.lng;
      c.lat=event.lat;
      coordinates.push(c);
    }
    // this.markerService.makeMaker(this.layerGroup,coordinates);
  }
}
