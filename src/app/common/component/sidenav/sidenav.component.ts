import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {MarkerService} from "../../service/marker.service";
import {GeoSearchService} from "../../service/geo-search.service";
import {SimpleQueryModel} from "../../model/simple-query.model";
import {ResultCity} from "../../model/result-city.model";
import {GeoAndTimeQuery} from "../../model/geo-and-time-query.model";
import {ResultData} from "../../model/result-data.model";
import {ResultDataEvent} from "../../model/result-data-event.model";
import {AuthenticationService} from "../../service/authentication.service";
import {TokenService} from "../../service/token.service";
import {EventDTO} from "../../model/event.model";
import {EventService} from "../../service/event.service";
import {FormControl} from "@angular/forms";
import {Observable, range} from "rxjs";
import {map, startWith} from 'rxjs/operators';
import {GeoPoint} from "../../model/geo-point.model";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";



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
  iconUrl: "assets/map-icons/book.png",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const restaurantIcon = L.icon({
  iconUrl: "assets/map-icons/food.png",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const sportIcon = L.icon({
  iconUrl: "assets/map-icons/sport.png",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const filmIcon = L.icon({
  iconUrl: "assets/map-icons/film.png",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const theatreIcon = L.icon({
  iconUrl: "assets/map-icons/theater.png",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const artIcon = L.icon({
  iconUrl: "assets/map-icons/art.png",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const fashionIcon = L.icon({
  iconUrl: "assets/map-icons/fashion.png",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const festivalIcon = L.icon({
  iconUrl: "assets/map-icons/festival.png",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const charitiesIcon = L.icon({
  iconUrl: "assets/map-icons/charities.png",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const kidsIcon = L.icon({
  iconUrl: "assets/map-icons/kids.png",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements AfterViewInit,OnInit {

  opened = false;
  public eventClicked = false;

  simpleQuery: SimpleQueryModel = new SimpleQueryModel();
  geoAndTimeQuery: GeoAndTimeQuery = new GeoAndTimeQuery();
  categories : string[] = [];

  resultData: ResultData = new ResultData();

  resultDataEvent: ResultDataEvent = new ResultDataEvent();
  eventDTO: EventDTO = new EventDTO();
  resultDateEventList: ResultDataEvent[] = [];

  //Autocomplete
  myControl = new FormControl();
  filteredOptions: Observable<ResultCity[]>;
  options: ResultCity[] = [];

  mapSize: any;

  private map;
  layerGroup = L.layerGroup();


  private initMap(): void {
    this.map = L.map('map', {
      center: [ 44.6653, 20.48474 ],
      zoom: 6,
      zoomControl: false
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(private markerService: MarkerService, private geoSearch: GeoSearchService, private eventService: EventService,
              public authenticationService:AuthenticationService,private tokenService:TokenService,
              private toastrService: ToastrService, private router: Router) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.layerGroup = L.layerGroup().addTo(this.map);
    this.map.invalidateSize();
    // this.markerService.makeMaker(this.map);
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
    this.categories = this.eventService.getCategories();
  }


  search(geoAndTimeQuery: GeoAndTimeQuery) {
  this.mapSize = this.map.getSize();

    geoAndTimeQuery.cityName= this.myControl.value.name || this.myControl.value;

    this.geoSearch.geoAndTimeSearch(geoAndTimeQuery).subscribe(
      data => {
        this.resultData = data;
        if(this.resultData.name === null){
          this.toastrService.error("City not found");
          return null;
        }
        this.opened = true;
        this.resultDateEventList = this.resultData.resultDataEvents;
        this.map.setView(new L.LatLng(this.resultData.geoPoint.lat,this.resultData.geoPoint.lon), 15);
        let coordinates: ICoordinates[] = [];
        // this.markerService.makeMarker(this.layerGroup,this.resultData.resultDataEvents);
        this.layerGroup.clearLayers();
        for(const event of this.resultData.resultDataEvents) {
          const lat = event.geoPoint.lat;
          const lng = event.geoPoint.lon;
          if(event.category === 'MUSIC' ) {
            const marker = L.marker([lat, lng],{icon:musicIcon});
            marker.addTo(this.layerGroup).on('click',function (e){
              this.eventIsClicked(e,event);
            },this);
          }else if(event.category === 'PERFORMING_ARTS' ) {
            const marker = L.marker([lat, lng],{icon:theatreIcon});
            marker.addTo(this.layerGroup).on('click',function (e){
              this.eventIsClicked(e,event);
            },this);
          }else if(event.category === 'FILM' ) {
            const marker = L.marker([lat, lng],{icon:filmIcon});
            marker.addTo(this.layerGroup).on('click',function (e){
              this.eventIsClicked(e,event);
            },this);
          }else if(event.category === 'LECTURES_AND_BOOK' ) {
            const marker = L.marker([lat, lng],{icon:bookIcon});
            marker.addTo(this.layerGroup).on('click',function (e){
              this.eventIsClicked(e,event);
            },this);
          }else if(event.category === 'FOOD_AND_DRINK' ) {
            const marker = L.marker([lat, lng],{icon:restaurantIcon});
            marker.addTo(this.layerGroup).on('click',function (e){
              this.eventIsClicked(e,event);
            },this);
          }else if(event.category === 'SPORTS' ) {
            const marker = L.marker([lat, lng],{icon:sportIcon});
            marker.addTo(this.layerGroup).on('click',function (e){
              this.eventIsClicked(e,event);
            },this);
          }else if(event.category === 'VISUAL_ARTS' ) {
            const marker = L.marker([lat, lng],{icon:artIcon});
            marker.addTo(this.layerGroup).on('click',function (e){
              this.eventIsClicked(e,event);
            },this);
          }else if(event.category === 'FASHION' ) {
            const marker = L.marker([lat, lng],{icon:fashionIcon});
            marker.addTo(this.layerGroup).on('click',function (e){
              this.eventIsClicked(e,event);
            },this);
          }else if(event.category === 'FESTIVALS_AND_FAIRS' ) {
            const marker = L.marker([lat, lng],{icon:festivalIcon});
            marker.addTo(this.layerGroup).on('click',function (e){
              this.eventIsClicked(e,event);
            },this);
          }else if(event.category === 'CHARITIES' ) {
            const marker = L.marker([lat, lng],{icon:charitiesIcon});
            marker.addTo(this.layerGroup).on('click',function (e){
              this.eventIsClicked(e,event);
            },this);
          }else if(event.category === 'KIDS_AND_FAMILY' ) {
            const marker = L.marker([lat, lng],{icon:kidsIcon});
            marker.addTo(this.layerGroup).on('click',function (e){
              this.eventIsClicked(e,event);
            },this);
          }else{
            const marker = L.marker([lat, lng]);
            marker.addTo(this.layerGroup).on('click',function (e){
              this.eventIsClicked(e,event);
            },this);
          }
        }
      }
    )


    // this.geoSearch.findCity(simpleQuery).subscribe(
    //   data=>{
    //   this.resultCity = data;
    //     this.map.setView(new L.LatLng(this.resultCity.geoPoint.lat,this.resultCity.geoPoint.lon), 15);
    // },error => {
    //     console.log(error);
    //   })

    // let coordinates: ICoordinates[] = [];
    // for(const event of resultData.events){
    //   let c:ICoordinates = { lat:0 , lng: 0};
    //   c.lng=event.lng;
    //   c.lat=event.lat;
    //   coordinates.push(c);
    // }
    // this.markerService.makeMaker(this.layerGroup,coordinates);
  }

  eventIsClicked(e, eventData: ResultDataEvent) {
    this.eventClicked = true;
    this.map.invalidateSize();
    this.map.flyTo(new L.LatLng(eventData.geoPoint.lat,eventData.geoPoint.lon),16,);
    this.eventService.getOneEvent(eventData.id).subscribe(
      data=> {
        this.eventDTO = data;
        for(let i=0; i< this.eventDTO.images.length; i++) {
          this.eventDTO.images[i].retrievedImage = 'data:image/jpeg;base64,' + this.eventDTO.images[i].picByte;
        }
      }
    );
    this.resultDataEvent = eventData;
  }


  eventViewClose() {
    this.map.invalidateSize();
    this.eventClicked = false;
  }

  logout() {
    this.tokenService.destroyToken();
  }


  displayFn(city: ResultCity): string {
    return city && city.name ? city.name : '';
  }


  private _filter(name: string): ResultCity[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  findAllOptions() {

    if(this.myControl.value.length>2 && this.myControl.value.length <5){
      this.geoSearch.findAllCitiesStartWith(this.myControl.value).subscribe(
        data=> {
          this.options = data;
        }
      )
    }
  }

  eventPanelClicked(eventResult: ResultDataEvent) {
    this.eventClicked = true;
    this.map.invalidateSize();
    this.map.flyTo(new L.LatLng(eventResult.geoPoint.lat,eventResult.geoPoint.lon),16,);
    this.eventService.getOneEvent(eventResult.id).subscribe(
      data=> {
        this.eventDTO = data;
        for(let i=0; i< this.eventDTO.images.length; i++) {
          this.eventDTO.images[i].retrievedImage = 'data:image/jpeg;base64,' + this.eventDTO.images[i].picByte;
        }
      }
    );
    this.resultDataEvent = eventResult;
  }


  handleOnShown() {
    this.map.invalidateSize();
  }
}
