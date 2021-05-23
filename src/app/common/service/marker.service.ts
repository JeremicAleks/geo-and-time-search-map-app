import {Injectable} from '@angular/core';
import * as L from "leaflet";
import {ResultDataEvent} from "../model/result-data-event.model";

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
const museumIcon = L.icon({
  iconUrl: "assets/map-icons/museum.png",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const touristIcon = L.icon({
  iconUrl: "assets/map-icons/tourist.png",
  shadowUrl: 'assets/marker-shadow.png',
  iconSize: [30, 36],
  iconAnchor: [12, 21],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

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
@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() { }

  makeMarker(layerGroup: L.LayerGroup,events:ResultDataEvent[]): void {
  }


  getMarkerIcon(name: string) {

    switch (name) {
      case 'MUSIC':
        return musicIcon;
      case 'PERFORMING_ARTS':
        return theatreIcon;
      case 'FILM':
        return filmIcon;
      case 'LECTURES_AND_BOOK':
        return bookIcon;
      case 'FOOD_AND_DRINK':
        return restaurantIcon;
      case 'SPORTS':
        return sportIcon;
      case 'VISUAL_ARTS':
        return artIcon;
      case 'FASHION':
        return fashionIcon;
      case 'FESTIVALS_AND_FAIRS':
        return festivalIcon;
      case 'CHARITIES':
        return charitiesIcon;
      case 'KIDS_AND_FAMILY':
        return kidsIcon;
      case 'MUSEUM':
        return museumIcon;
      case 'TOURIST_ATTRACTION':
        return touristIcon;
      default:
        return iconDefault;

    }

  }




}
