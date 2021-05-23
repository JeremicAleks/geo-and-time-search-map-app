export class GeoAndTimeQuery {
  cityName: string;
  countryName: string;
  startDate: Date;
  endDate: Date;
  category: string;

  constructor() {
    this.cityName = "";
    this.countryName = "";
    this.startDate = null;
    this.endDate = null;
    this.category = null;
  }
}
