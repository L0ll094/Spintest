import { Component, OnInit,ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PassToPythonService } from '../common/services/pass-to-python.service';
import {MatTableModule} from '@angular/material/table';
import {ResultsService} from '../common/services/results.service';
import {CommonModule} from '@angular/common';  
import {ChartDataSets,ChartOptions} from 'chart.js';
import {Color,Label} from 'ng2-charts';


@Component({
  selector: 'app-find-capacity',
  templateUrl: './find-capacity.component.html',
  styleUrls: ['./find-capacity.component.css']
})
export class FindCapacityComponent implements OnInit {
  /*Do I use the FOrmgroup vs just setting it  */
  data;
  theInput: FormGroup;
  show_results: Boolean=false;

  lineChartData: ChartDataSets[] = [
      { data: [  ], label: '3 Suggested capacities' },
    ];

  lineChartLabels: Label[] = [this._results.capacity_low_sep,this._results.capacity_mid_sep,this._results.capacity_high_sep];
  lineChartOptions = {
      responsive: true,
    };
  lineChartColors: Color[] = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,255,0,0.28)',
      },
    ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  
  



  constructor(
    private _results: ResultsService,
    private _PassToPythonServiceHolder: PassToPythonService,
    private formBuilder: FormBuilder,

    ) {  }


  ngOnInit() {
    //Yes i know I don't really need a whole group here, but frankly, I have done groups before but not single
    //form controls and I don't have the extra half an hour to deal with the research and debugging. And this works fine.
    this.theInput=this.formBuilder.group({
      desiredQ:[null,[Validators.required,]],
      Effluent_conc_low:[null],
      Effluent_conc_high:[null],})
  }



  create_graph(){
    /*Sends the desired Q along to the backend and decides what to do with the response*/
     //Plot:
    this.show_results=true;
    let data=JSON.stringify(this.theInput.value);
    console.log(data)

    this._PassToPythonServiceHolder.sendYourQ(data).subscribe(
      res => {
        console.log("The constants High, medium and Low capacity as well as High, M and Low LF has been added to the database:")
        console.log(res)
        let temp=JSON.parse(res)
        this._results.capacity_low_sep=temp.KQ_1;
        this._results.capacity_mid_sep=temp.KQ;
        this._results.capacity_high_sep=temp.KQ_2;

        this._results.LF_low_sep=temp.LF_1;
        this._results.LF_mid_sep=temp.LF;
        this._results.LF_high_sep=temp.LF_2; 
      },
      err => console.log(err)
    );
      

 
  }
  
  

}
