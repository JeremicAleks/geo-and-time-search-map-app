
export class AddEvent {
 name: string;
 description: string;
 lat: number;
 lon: number;
 eventDate: Date;
 category: string;
 categoryName: string;
 address:string;
 webSite: string;
 phone: string;
 city: string;
 booking: boolean;
 bookingName: string;
 bookingPrice: number;
 bookingUrl: string;

 constructor() {
   this.name = '';
   this.description = '';
   this.lat = null;
   this.lon = null;
   this.eventDate = null;
   this.category = '';
   this.categoryName = '';
   this.address = '';
   this.webSite = '';
   this.phone = '';
   this. city = '';
   this.booking = false;
   this.bookingName = null;
   this.bookingPrice = 0;
   this.bookingUrl = null;
 }
}
