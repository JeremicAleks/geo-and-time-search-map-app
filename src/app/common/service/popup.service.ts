import { Injectable } from '@angular/core';
import {ResultDataEvent} from "../model/result-data-event.model";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  createPopup(event: ResultDataEvent): string {
    if (event.date!=null) {
      return `` +
        `<div>${event.name}</div>` +
        `<div>${event.date}</div>`;
    }else{
      return `` +
        `<div>${event.name}</div>` +
        `<div>Every day</div>`;
    }
  }
}
