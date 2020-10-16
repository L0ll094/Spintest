import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassToPythonService {
  private myURL='http://127.0.0.1:5000/'


  constructor(private http: HttpClient) { }
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

  /*
  sendToBackend(data: Data): Observable<any>{
    return this.http
    .post( `${API_URL}/exams`,exam);
  }
  */


}
