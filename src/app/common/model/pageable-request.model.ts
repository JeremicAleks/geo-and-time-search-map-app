export class PageableRequest {
  page: number;
  size: number;
  flagFilter: boolean;

  constructor() {
    this.page = null;
    this.size = null;
    this.flagFilter = false;
  }
}
