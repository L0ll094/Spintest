import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PassToPythonService } from '../common/services/pass-to-python.service';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {ResultsService} from '../common/services/results.service';
import {ChartDataSets,ChartOptions} from 'chart.js';
import {Color,Label} from 'ng2-charts';
import { formatNumber} from '@angular/common';
import * as crosshair from 'chartjs-plugin-crosshair';


@Component({
  selector: 'app-meet-criteria',
  templateUrl: './meet-criteria.component.html',
  styleUrls: ['./meet-criteria.component.css']
})
export class MeetCriteriaComponent implements OnInit {
  data;
  the_input: FormGroup;

  show_results: Boolean=false;//Change for debugging
  stepsize_y=5;
  Loadfactor=0;
 




  constructor(
    public _results: ResultsService,
    private _PassToPythonServiceHolder: PassToPythonService,
    private formBuilder: FormBuilder,
    ) {  }
  
  //Chart properties are saved as class properties so that they can be more easily passed to the chart element in the
  //html file. They are given fake initial values before they are updated by the "submit"-button
  
  //Initial values so I know if something didn't update
  ChartData: ChartDataSets[]= [
      {data: [
        {x:1,y:1},
        {x:2,y:2},
        {x:3,y:3}
      ],
        label: 'DEFAULT',
        pointRadius:10,
        pointHoverRadius:15,
        fill: false,
      },
     ];
  ChartData2: ChartDataSets[]= [
      {data: [
        {x:1,y:1},
        {x:2,y:2},
        {x:3,y:3}
      ],
        label: 'DEFAULT',
        pointRadius:10,
        pointHoverRadius:15,
        fill: false,
      },
     ];
  
  
  
  ChartFontSize=16;
  //ChartLegend = true;
  ChartType = 'line';
  
  //Tool to read data off graph more easily
  ChartPlugins=[crosshair];
  
  ChartOptions={
    title:{
      text:"Maximum Q for machine size KQ [L/h]",
      display: true,
      fontSize: 30,
    },
    responsive: true, 
    legend:{
      display:false
    },

    tooltips: {
      enabled:true,
      mode: 'interpolate'
    },
    
    scales:{
      yAxes:[{
        scaleLabel: {
          display: true, 
          labelString:'Maximum Flow Q [L/h]',
          fontSize:20,
          
        },    
        gridlines: {
          display:true,
          
        },

      }],
      xAxes:[{
        type:'linear',
        scaleLabel: {
          display: true, 
          labelString:'Separator Size [KQ]',
          fontSize:20,
        },   
      }]
    },
    
  };
  ChartOptions2={
    title:{
      text:"Maximum Q  for machine size [Ae]",
      display: true,
      fontSize: 30,
    },
    responsive: true, 
    legend:{
      display:false
    },

    tooltips: {
      enabled:true,
      mode: 'interpolate'
    },
    
    scales:{
      yAxes:[{
        scaleLabel: {
          display: true, 
          labelString:'Maximum Flow Q [L/h]',
          fontSize:20,
          
        },    
        gridlines: {
          display:true,
          
        },
 
        
      }],
      xAxes:[{
        type:'linear',
        scaleLabel: {
          display: true, 
          labelString:'Separator Size [Ae]',
          fontSize:20,
        },   
      }]
    },
    
  };

  ChartColors: Color[]=[
    {
      borderColor: 'black',
      borderWidth: 1,
      hoverBorderWidth:2,
      hoverBorderColor:'red',

    },
  ];

    
    updateChart(){
      //The updating of the chart is done in a function since we want it to update on the click of the submit  button
      //in case you want to try different parameter one after another
      let KQs=this._results.KQ_array;
      let Qs=this._results.Qmax_array;
      

      let x1=KQs[0];
      let x2=KQs[1];
      let x3=KQs[2];
      let x4=KQs[3];
      let x5=KQs[4];

      //Bad coding here I know, but not familiar with ts syntax, will fix if have time

      let z1=KQs[0]*38.2;
      let z2=KQs[1]*38.2;
      let z3=KQs[2]*38.2;
      let z4=KQs[3]*38.2;
      let z5=KQs[4]*38.2;
    
    

      let y1=Qs[0];
      let y2=Qs[1];
      let y3=Qs[2];
      let y4=Qs[3];
      let y5=Qs[4];

      this.stepsize_y=(y2-y1)/2;
      this.Loadfactor=this._results.LF_crit;
      //this.ChartOptions.scales.yAxes[3].ticks.stepSize=1
      //this.ChartOptions2.scales.yAxes[3].ticks.stepSize=1
 
 

  
      this.ChartData = [
        {data: [
          {x:x1,y:y1},
          {x:x2,y:y2},
          {x:x3,y:y3},
          {x:x4,y:y4},
          {x:x5,y:y5},
        ],
          label: 'Max. flow to reach desired criteria ',
          pointRadius:10,
          pointHoverRadius:15,
          fill: false,
        },
       ];
      
      this.ChartData2 = [
        {data: [
          {x:z1,y:y1},
          {x:z2,y:y2},
          {x:z3,y:y3},
          {x:z4,y:y4},
          {x:z5,y:y5},
        ],
          label: 'Max. flow to reach desired criteria ',
          pointRadius:10,
          pointHoverRadius:15,
          fill: false,
        },
       ];
      }
      


  ngOnInit() {
  

    
    let lowest = this._results.results_spintest[0];
    let highest=this._results.results_spintest[this._results.results_spintest.length-1];
    console.log("lowest");
    console.log(lowest);
    console.log("Highest:");
    console.log(highest);

    //Yes i know I don't really need a whole group here, but frankly, I have done groups before but not single
    //form controls and I don't have the extra half an hour to deal with the research and debugging. And this works fine.
    this.the_input=this.formBuilder.group({

      criteria:[null,[Validators.required,]],
      KQ:[null]
    })
  }



  submit_your_data(){
    /*Sends the input along to the backend and decides what to do with the response*/
    
    let data=JSON.stringify(this.the_input.value);
    //console.log(data)
    this.show_results=true;


    this._PassToPythonServiceHolder.sendYourCriteria(data).subscribe(
      res => {
        console.log("The constants 'LF_crit', 'KQ' and 'Qmax' has been added to the database:")
        let temp=JSON.parse(res)
        console.log(temp)
        this._results.LF_crit=temp.LF//Specify what LF units are!
        this._results.KQ_array=temp.KQ
        this._results.Qmax_array=temp.Qmax
        this.updateChart();//Updating must happen after results have been recieved
      },
      err => {
        alert("Unfortunately, an error occured when communicating with the calculation tool."); 
        console.log("An error occurred in meet-criteria.component.ts, submit_your_data()"); 
        
      }

    )
    
  };

}


