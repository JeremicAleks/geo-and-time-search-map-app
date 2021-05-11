import {GeoPoint} from "./geo-point.model";

export class ResultDataEvent {
  id: number;
  name: string;
  geoPoint: GeoPoint;
  eventDate: Date;
  description: string;
  category: string;
  address:string;
  webSite: string;
  phone: string;
  city: string;

  constructor() {
    this.id = null;
    this.name = '';
    this.geoPoint = new  GeoPoint();
    this.eventDate = null;
    this.description = '';
    this.category = '';
    this.address = '';
    this.webSite = '';
    this.phone = '';
    this. city = '';
  }
}
