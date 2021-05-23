import {ImageModel} from "./image.model";

export class EventDTO {
  id:number;
  name:string;
  description:string;
  lat:number;
  lon:number;
  eventDate: Date;
  category: string;
  categoryName: string;
  address:string;
  approved:boolean;
  webSite: string;
  phone: string;
  city: string;
  images: ImageModel[];
  booking: boolean;
  bookingName: string;
  bookingPrice: number;
  bookingUrl: string;

  constructor() {
    this.id = null;
    this.name = "";
    this.description = "";
    this.lat = null;
    this.lon = null;
    this.eventDate = null;
    this.category = '';
    this.categoryName = '';
    this.address = '';
    this.webSite = '';
    this.phone = '';
    this. city = '';
    this.images = [];
    this.booking = false;
    this.bookingName = null;
    this.bookingPrice = 0;
    this.bookingUrl = null;
    this.approved = false;
  }
}
