import {GeoPoint} from "./geo-point.model";

export class ResultCity{
  id: string;
  name: string;
  nameAscii: string;
  country: string;
  iso3: string;
  adminName: string;
  geoPoint: GeoPoint;

  constructor() {
    this.id = "";
    this.name = "";
    this.nameAscii = "";
    this.iso3 = "";
    this.country = "";
    this.adminName = "";
    this.geoPoint = new GeoPoint();
  }
}
