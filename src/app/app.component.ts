import {Component} from '@angular/core';
import {Chart} from 'chart.js'
import {ResultsService} from './common/services/results.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  title: string = "Explore Extended";


  constructor(
    public _results: ResultsService,


    ) {  }
  isEquipmentDataSetup(){
    return this._results.equipment_setup_successfully==true;
  }

  isSpintestdataSetup(){
   
    return this._results.spintest_setup_successfully==true;

  }
  

}
