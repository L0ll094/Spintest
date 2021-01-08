import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PassToPythonService } from '../common/services/pass-to-python.service';
import {MatTableModule} from '@angular/material/table';
import {ResultsService} from '../common/services/results.service';
import {ChartDataSets,ChartOptions} from 'chart.js';
import {Color,Label} from 'ng2-charts';
import { formatNumber} from '@angular/common';
import * as crosshair from 'chartjs-plugin-crosshair';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-find-q',
  templateUrl: './find-q.component.html',
  styleUrls: ['./find-q.component.css']
})
export class FindQComponent implements OnInit {
  data;
  your_KQ: FormGroup;
  //Uncomment below when exciting debugger mode. Remove hardcoded efficiencies
  //efficiencies=this._results.results_spintest;
  efficiencies=[38,22,10,4];
  stepsize_y=5;
  show_results: Boolean=false;//Change for debugging
  chosen_unit="KQ"; //The user can choose to use KQ or use Ae for their plot
  //KQ is set as default. The choice is put underneath the picture on the mat-card

  lastAe=0;//When using Ae, this is the latest value that was used to plot in case the user is plotting many times

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


ChartFontSize=16;
//ChartLegend = true;
ChartType = 'line';

//Tool to read data off graph more easily
ChartPlugins=[crosshair];

ChartOptions={
  title:{
    text:"Flow Q corresponding to separation results",
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
        labelString:'Flow Q [L per h]',
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
        labelString:this._results.separation_result,
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

    let Qs=this._results.resulting_flows;
    

    let x1=this.efficiencies[0];
    let x2=this.efficiencies[1];
    let x3=this.efficiencies[2];
    let x4=this.efficiencies[3];
   
  
  

    let y1=Qs[0];
    let y2=Qs[1];
    let y3=Qs[2];
    let y4=Qs[3];

    this.stepsize_y=(y2-y1)/3;
    //this.ChartOptions.scales.yAxes[3].ticks.stepSize=this.stepsize_y;

    this.ChartData = [
      {data: [
        {x:x1,y:y1},
        {x:x2,y:y2},
        {x:x3,y:y3},
        {x:x4,y:y4}
      ],
        label: 'Maximum flow: ',
        pointRadius:10,
        pointHoverRadius:15,
        fill: false,
      },
     ];
    };
    
  ngOnInit() {


    //Yes i know I don't really need a whole group here, but frankly, I have done groups before but not single
    //form controls and I don't have the extra half an hour to deal with the research and debugging. And this works fine.
    this.your_KQ=this.formBuilder.group({
      KQ:[null,[Validators.required,]]})
  };
  changeUnitChoice(unitChoice: string){
    if (unitChoice=="KQ"){
      console.log("It is KQ");
      this.chosen_unit=unitChoice;

    }
    if (unitChoice=="Ae"){
      console.log("It is Ae");
      this.chosen_unit=unitChoice;

    }
    
  }



  submit_your_KQ(){
    /*Sends the desired Q along to the backend and decides what to do with the response*/
    

  

    this.show_results=true;

    if(this.chosen_unit=="Ae"){
        this.your_KQ.value["KQ"]=this.your_KQ.value["KQ"]/38.2;
      }

 
    console.log("This is sent to the backend:");
    console.log(this.your_KQ.value);
    let data=JSON.stringify(this.your_KQ.value);
    this.your_KQ.reset()

    this._PassToPythonServiceHolder.sendYourKQ(data).subscribe(
      res => {
        console.log("The constant 'resulting flows' has been added to the database:")
        console.log(res)
        let temp=JSON.parse(res)
        
        this._results.resulting_flows=temp.The_Flows//The 4 resulting flows as a vector
        //this.updateChart();//Updating must happen after results have been recieved
        
        this.updateChart();
      },
      err=> console.log(err)

    )};
};
