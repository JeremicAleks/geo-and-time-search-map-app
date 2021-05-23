import { Component, OnInit } from '@angular/core';
import {EventDTO} from "../../../model/event.model";
import {EventService} from "../../../service/event.service";
import {ImageListModel} from "../../../model/imageList.model";
import {ImageModel} from "../../../model/image.model";
import {ToastrService} from "ngx-toastr";
import {ImgFileModel} from "../../../model/img-file.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-image-change',
  templateUrl: './image-change.component.html',
  styleUrls: ['./image-change.component.css']
})
export class ImageChangeComponent implements OnInit {


  eventDTO: EventDTO = new EventDTO();
  imageList: ImageListModel = new ImageListModel();

  imgFiles: ImgFileModel[] = [];

  constructor(private eventService: EventService,private toastrService: ToastrService,public domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initUpdateEvent();
  }


  initUpdateEvent(){
    this.eventDTO = this.eventService.getEventFromStorage();
    this.eventService.getImagesFromEvent(this.eventDTO.id).subscribe(
      data => {
        this.imageList = data;
        for(let i=0; i< this.imageList.images.length; i++) {
          this.imageList.images[i].retrievedImage = 'data:image/jpeg;base64,' + this.imageList.images[i].picByte;
        }
      }
    )
  }

  onFileChanged(event) {

    for(let i=0; i<event.target.files.length ; i++ ){
      let imgFile: ImgFileModel = new ImgFileModel();
      imgFile.imageUrl = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[i]));
      imgFile.selectedFile = event.target.files[i];
      this.imgFiles.push(imgFile);
    }
  }

  deleteImage(image: ImageModel, i: number) {
    this.eventService.deleteImage(image.id).subscribe(
      ()=>{
        this.imageList.images.splice(i,1);
        this.toastrService.success("Image is successfully deleted.");
      }
    )
  }

  deleteImageFromAdd(i: number) {
    this.imgFiles.splice(i,1);
  }

  saveEvent(imgFiles: ImgFileModel[]) {
    for(let i=0; i< this.imgFiles.length ; i++) {
      const uploadImageData = new FormData();
      uploadImageData.append("imageFile",this.imgFiles[i].selectedFile,this.imgFiles[i].selectedFile.name);
      this.eventService.uploadImage(this.eventDTO.id, uploadImageData).subscribe(
        data => {
          this.imgFiles = [];
          this.initUpdateEvent();
        }, error => {
        }
      );
    }
  }
}
