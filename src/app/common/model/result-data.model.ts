import {GeoPoint} from "./geo-point.model";
import {ResultDataEvent} from "./result-data-event.model";

export class ResultData {
  name: string;
  geoPoint: GeoPoint;
  resultDataEvents: ResultDataEvent[];
  constructor() {
    this.name = "";
    this.geoPoint = new GeoPoint();
    this.resultDataEvents = [];
  }

}
