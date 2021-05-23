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
import {Observable} from "rxjs";
import {map, startWith} from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {PopupService} from "../../service/popup.service";

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


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
              private toastrService: ToastrService, private router: Router,private popupService: PopupService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.layerGroup = L.layerGroup().addTo(this.map);
    this.map.invalidateSize();
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
    if (geoAndTimeQuery.startDate === null){
      geoAndTimeQuery.startDate = new Date();
    }

    geoAndTimeQuery.cityName= this.myControl.value.name || this.myControl.value;

    if(this.myControl.value.country !== undefined)
      geoAndTimeQuery.countryName = this.myControl.value.country;

    if (geoAndTimeQuery.category === "all"){
      geoAndTimeQuery.category = null;
    }

    this.geoSearch.geoAndTimeSearch(geoAndTimeQuery).subscribe(
      data => {
        this.resultData = data;
        if(this.resultData.name === null){
          this.toastrService.error("City not found");
          return null;
        }
        geoAndTimeQuery.countryName = "";
        this.resultDateEventList = this.resultData.resultDataEvents;
        if(this.resultDateEventList.length === 0)
          this.toastrService.info("No events","",{timeOut:5000});
        this.opened = this.resultDateEventList.length > 0;
        this.sortByDate();
        this.map.setView(new L.LatLng(this.resultData.geoPoint.lat,this.resultData.geoPoint.lon), 15);
        this.layerGroup.clearLayers();
        for(const event of this.resultData.resultDataEvents) {
          const lat = event.geoPoint.lat;
          const lng = event.geoPoint.lon;
          const marker = L.marker([lat, lng],{icon:this.markerService.getMarkerIcon(event.category)});
          marker.bindPopup(this.popupService.createPopup(event));
          marker.on('mouseover',function (e){
            this.openPopup();
          });
          marker.on('mouseout',function (e){
            this.closePopup();
          })
            marker.addTo(this.layerGroup).on('click',function (e) {
              this.eventIsClicked(e, event);
            },this);

        }
      }
    )
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


  bookNow(eventDTO: EventDTO) {
    window.open(eventDTO.bookingUrl, "_blank");
  }

  private getTimeFromDate(date?: Date){
    return date != null ? new Date(date).getTime() : new Date('2100-1-1').getTime();
  }

  public sortByDate(): void {
   this.resultDateEventList =  this.resultDateEventList.slice().sort((a,b)=> {
      return this.getTimeFromDate(a.eventDate) - this.getTimeFromDate(b.eventDate);
    })
  }

}
