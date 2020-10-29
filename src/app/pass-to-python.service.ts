import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  
  sendToBackend(): Observable<any>{

    //const headers = { 'Content-Type': 'application/json'};
    return this.http.get("http://127.0.0.1:5000/testpage",{observe: 'response'});
    
  }
  sendToBackend2(data): Observable<any>{
  
    const headers = { 'content-type': 'application/json'};
    return this.http.post("http://127.0.0.1:5000/testpagepost",data);
    
  }
  


}
