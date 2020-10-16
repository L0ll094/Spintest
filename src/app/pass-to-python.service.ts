import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassToPythonService {

  constructor() { }
  dataContainer=[];

  addToContainer(data) {
    this.dataContainer.push(data);
  }

  getData(){
    return this.dataContainer;
  }

  clearContainer(){
    this.dataContainer=[];
    return this.dataContainer;

  }


}
