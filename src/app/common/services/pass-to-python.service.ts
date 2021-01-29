import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassToPythonService {
 /*Pass to python service supplies each component with the adress for where to send data, 
 either to setup a spintest or to request that calculations be done for one of the 4 analysis options.
 The address below is where the backend lives during development. During production it lives inside docker, and the
 address must be changed before the docker image is built. This is explained step by step in "Maintenance of explore extended*/


  constructor(private http: HttpClient) { }




  sendEquipmentProperties(data): Observable<any>{
    

   
    return this.http.post("http://127.0.0.1:5000/send_equipment_properties",data);
    
  }
  sendSpintestData(data): Observable<any>{
  
   
    return this.http.post("http://127.0.0.1:5000/send_spintest_data",data);
    
  }


  sendYourKQ(data): Observable<any>{
    /* This function sets up communication for the find-q-component */

    return this.http.post("http://127.0.0.1:5000/find_flowrate",data);
  }


  sendYourCriteria(data): Observable<any>{
    /* This function sets up communication for the meet-criteria-component */

    return this.http.post("http://127.0.0.1:5000/fulfill_criteria",data);
  }

  sendYourQ(data): Observable<any>{
    /* This function sets up communication for the find-capacity-component */
    
    return this.http.post("http://127.0.0.1:5000/find_capacity",data);
  }

  sendForSpintimes(data): Observable<any>{
     /* This function sets up communication for the calculate-spintimes-component */

    return this.http.post("http://127.0.0.1:5000/calculate_spintimes",data);

  }




}
