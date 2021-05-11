export class GeoAndTimeQuery {
  cityName: string;
  startDate: Date;
  endDate: Date;
  category: string;

  constructor() {
    this.cityName = "";
    this.startDate = null;
    this.endDate = null;
    this.category = "";
  }
}
