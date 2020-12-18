import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassToPythonService {



  constructor(private http: HttpClient) { }




  sendEquipmentProperties(data): Observable<any>{
  //The address below needs to change once it is all inside docker, since the address should
  //point to the docker network's port where backend sits.
   
    return this.http.post("http://127.0.0.1:5000/send_equipment_properties",data);
    
  }
  sendSpintestData(data): Observable<any>{
  
   
    return this.http.post("http://127.0.0.1:5000/send_spintest_data",data);
    
  }


  sendYourKQ(data): Observable<any>{

    return this.http.post("http://127.0.0.1:5000/find_flowrate",data);
  }


  sendYourCriteria(data): Observable<any>{

    return this.http.post("http://127.0.0.1:5000/fulfill_criteria",data);
  }

  sendYourQ(data): Observable<any>{
    
    return this.http.post("http://127.0.0.1:5000/find_capacity",data);
  }

  sendForSpintimes(data): Observable<any>{

    return this.http.post("http://127.0.0.1:5000/calculate_spintimes",data);

  }




}
