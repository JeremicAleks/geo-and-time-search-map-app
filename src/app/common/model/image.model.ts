export class ImageModel {
  id:number;
  name: string;
  type: string;
  picByte: any;
  retrievedImage: any;

  constructor() {
    this.id = null;
    this.name = '';
    this.type = '';
    this.picByte = null;
    this.retrievedImage = null;
  }

}
