import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from "leaflet";
import {SimpleQueryModel} from "../../model/simple-query.model";
import {GeoSearchService} from "../../service/geo-search.service";
import {ResultCity} from "../../model/result-city.model";
import {LatLng} from "leaflet";
import {AddEvent} from "../../model/add-event.model";
import {EventService} from "../../service/event.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {EventDTO} from "../../model/event.model";
import {DomSanitizer} from "@angular/platform-browser";
import {ImgFileModel} from "../../model/img-file.model";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements AfterViewInit {


  simpleQuery: SimpleQueryModel = new SimpleQueryModel();
  resultCity: ResultCity = new ResultCity();
  addEvent: AddEvent = new AddEvent();

  private map;
  layerGroup = L.layerGroup();
  //Image
  imgURL: any;
  imgFiles: ImgFileModel[] = [];
  selectedFiles: File[] = [];
  imagesURLs: any[] = [];


  private initMap(): void {
    this.map = L.map('mapFind', {
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
      this.addEvent.lat= e.latlng.lat;
      this.addEvent.lon= e.latlng.lng;
      this.layerGroup.clearLayers();
      L.marker([e.latlng.lat,e.latlng.lng]).addTo(this.layerGroup);
    })

    tiles.addTo(this.map);
  }


  constructor(private toastrServcie:ToastrService,private geoSearch: GeoSearchService,
              private eventService: EventService,private router: Router,public domSanitizer: DomSanitizer) { }


  ngAfterViewInit(): void {
    this.initMap();
  }


    find(city: string) {
    let simpleQuery: SimpleQueryModel = new SimpleQueryModel();
    simpleQuery.value = city;
    this.geoSearch.findCity(simpleQuery).subscribe(
      data => {
        this.resultCity = data;
        this.map.setView(new LatLng(this.resultCity.geoPoint.lat,this.resultCity.geoPoint.lon),15);
      },error => {
        console.log(error);
      }
    )

  }

  saveEvent(addEvent: AddEvent) {
    this.eventService.saveEvent(addEvent).subscribe(
      data => {
        for(let i=0; i< this.imgFiles.length ; i++) {
          const uploadImageData = new FormData();
          uploadImageData.append("imageFile",this.imgFiles[i].selectedFile,this.imgFiles[i].selectedFile.name);
          this.eventService.uploadImage(data.id, uploadImageData).subscribe(
            data => {
              this.router.navigate(['']);
            }, error => {
              this.toastrServcie.error("Image is not added");
            }
          );
        }
        this.toastrServcie.success("Event is successfully created");
        this.router.navigate(['']);
      },error => {
        console.log(error);
      }
    )
  }


  onFileChanged(event) {
    console.log(event.target.files);
    // this.imagesURLs = [];
    // this.selectedFiles = [];
      for(let i=0; i<event.target.files.length ; i++ ){
        let imgFile: ImgFileModel = new ImgFileModel();
        imgFile.imageUrl = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[i]));
        imgFile.selectedFile = event.target.files[i];
        this.imgFiles.push(imgFile);
      }
      this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
  }

  deleteImage(i: number) {
    this.imgFiles.splice(i,1);

  }
}
