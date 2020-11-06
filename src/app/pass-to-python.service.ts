import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PassToPythonService {
  //private myURL='http://127.0.0.1:5000/'


  constructor(private http: HttpClient) { }


  sendFluidProperties(data): Observable<any>{
  
    
    return this.http.post("http://127.0.0.1:5000/send_fluid_properties",data);
    
  }

  sendEquipmentProperties(data): Observable<any>{
  
   
    return this.http.post("http://127.0.0.1:5000/send_equipment_properties",data);
    
  }
  sendSpintestData(data): Observable<any>{
  
   
    return this.http.post("http://127.0.0.1:5000/send_spintest_data",data);
    
  }





  sendYourKQ(data): Observable<any>{

    return this.http.post("http://127.0.0.1:5000/find_flowrate",data).pipe(map((response: any) => console.log(JSON.stringify(response))));
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
