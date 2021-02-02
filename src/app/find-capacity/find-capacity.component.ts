import { Component, OnInit,ElementRef} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PassToPythonService } from '../common/services/pass-to-python.service';
import {MatTableModule} from '@angular/material/table';
import {ResultsService} from '../common/services/results.service';
import {CommonModule} from '@angular/common';  
import {ChartDataSets,ChartOptions} from 'chart.js';
import {Color,Label} from 'ng2-charts';
import { formatNumber} from '@angular/common';
import * as crosshair from 'chartjs-plugin-crosshair';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-find-capacity',
  templateUrl: './find-capacity.component.html',
  styleUrls: ['./find-capacity.component.css']
})
export class FindCapacityComponent implements OnInit {
  /*Do I use the FOrmgroup vs just setting it  */
  data;
  theInput: FormGroup;
  //Property to keep track of showing or not showing the chart
  show_results: Boolean=false;
  chosen_unit="m3/h";
  conversion_factor=1;//To convert chosen display unit into m3/h which the backend expects

  Loadfactor1;
  Loadfactor2;
  Loadfactor3;
  conc1;
  conc2;
  conc3;
  //Chart properties are saved as class properties so that they can be more easily passed to the chart element in the
  //html file. They are given fake initial values before they are updated by the "submit"-button
  
  //Initial values so I know if something didn't update
  ChartData1: ChartDataSets[]= [
    {data: [1,2,3], label: 'Initial_Data' },
   ];
   ChartData2: ChartDataSets[]= [
    {data: [1,2,3], label: 'Initial_Data' },
   ];
  ChartLabels: Label[]= ["First","Second","Third"];
  
  
  ChartFontSize=16;
  //ChartLegend = true;
  ChartType = 'line';
  
  //Tool to read data off graph more easily
  ChartPlugins=[crosshair];
  
  ChartOptions1={
    title:{
      text:"Separator size req. for different "+`${this._results.separation_result}`,
      display: true,
      fontSize: 30,
    },
    responsive: true, 
    legend:{
      display:false
    },

    tooltips: {
      enabled:true,
      mode: 'interpolate'},
    
    scales:{
      xAxes:[{
        type:'linear',
        scaleLabel: {
          display: true, 
          labelString:'Size KQ',
          fontSize:20,
          
        },    
        gridlines: {
          display:true,
          
        },
        

      }],
      yAxes:[{
        
        scaleLabel: {
          display: true, 
          labelString: this._results.separation_result,
          fontSize:20,
        }, 
        gridlines: {
          display:true,
          
        },  
      }]
    },
   
  };

  ChartOptions2={
    title:{
      text:"Separator size req. for different "+`${this._results.separation_result}`,
      display: true,
      fontSize: 30,
    },
    responsive: true, 
    legend:{
      display:false
    },

    tooltips: {
      enabled:true,
      mode: 'interpolate'},
    
    scales:{
      xAxes:[{
        type:'linear',
        scaleLabel: {
          display: true, 
          labelString:'Size Ae',
          fontSize:20,
          
        },    
        gridlines: {
          display:true,
          
        },
        

      }],
      yAxes:[{
        
        scaleLabel: {
          display: true, 
          labelString: this._results.separation_result,
          fontSize:20,
        }, 
        gridlines: {
          display:true,
          
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
    let x1=this._results.size_low_sep;
    let x2=this._results.size_mid_sep;
    let x3=this._results.size_high_sep;

    let z1=Math.round( (x1*38.2) * 100 + Number.EPSILON ) / 100;
    let z2=Math.round( (x2*38.2) * 100 + Number.EPSILON ) / 100;
    let z3=Math.round( (x3*38.2) * 100 + Number.EPSILON ) / 100;

    let y1=this.theInput.value['Effluent_conc_low'];
    let y3=this.theInput.value['Effluent_conc_high'];
    let y2=(y1+y3)/2;

    this.Loadfactor1=this._results.LF_low_sep;
    this.Loadfactor2=this._results.LF_mid_sep;
    this.Loadfactor3=this._results.LF_high_sep;
    this.conc1=y1;
    this.conc2=y2;
    this.conc3=y3;

    this.ChartData1 = [
      {data: [
        {x:x1,y:y1},
        {x:x2,y:y2},
        {x:x3,y:y3}
      ],
        label: this._results.separation_result,
        pointRadius:10,
        pointHoverRadius:15,
        fill: false,
      },
     ];
     this.ChartData2 = [
      {data: [
        {x:z1,y:y1},
        {x:z2,y:y2},
        {x:z3,y:y3}
      ],
        label: this._results.separation_result,
        pointRadius:10,
        pointHoverRadius:15,
        fill: false,
        
      },
     ];



  }
  changeChosenUnit(unit){
    if (unit=="L/h"){
      this.conversion_factor=0.001;
      this.chosen_unit="L/h"
    }
    else if (unit=="m3/h") {
      this.conversion_factor=1;
      this.chosen_unit="m3/h"
    }
    else if (unit=="barrels/h") {
      //1 barrel is 118 L
      this.conversion_factor=118*0.001;
      this.chosen_unit="barrels/h";
    }
    else if (unit=="gpm") {
      //Gallons per minute, 1 gallon = 3.78541178 liter
      this.conversion_factor=3.78541178*60*0.001;
      this.chosen_unit="gpm"
    }
    else if (unit=="hL/h") {
      this.conversion_factor=0.1;
      this.chosen_unit="hL/h"
    }
    else{
      this.conversion_factor=1;
      this.chosen_unit="m3/h"

    }



}


  constructor(
    public _results: ResultsService,
    private _PassToPythonServiceHolder: PassToPythonService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,

    ) {  }


  ngOnInit() {
    //Yes i know I don't really need a whole group here, but frankly, I have done groups before but not single
    //form controls and I don't have the extra half an hour to deal with the research and debugging. And this works fine.
    this.theInput=this.formBuilder.group({
      desiredQ:[null,[Validators.required,]],
      Effluent_conc_low:[null],
      Effluent_conc_high:[null],})
  }
//HOw to acces the value inputed in other parts of this script: i.e. this.theInput.value['desiredQ'])


  create_graph(){
    /*Sends the desired Q along to the backend and decides what to do with the response*/

    if(this._results.spintest_setup_successfully==false){
      this._snackBar.open("Since you have not set up a spintest yet, the graph won't be accurate to your spintest.", "Ok!")
    };
    this.show_results=true;


    let desiredQ_m3perH=this.theInput.controls['desiredQ'].value*this.conversion_factor;
    console.log("The q converted:");
    console.log(desiredQ_m3perH);
    console.log("m3 per h");
    this.theInput.controls['desiredQ'].setValue(desiredQ_m3perH)
    

    let data=JSON.stringify(this.theInput.value);

    this._PassToPythonServiceHolder.sendYourQ(data).subscribe(
      res => {


        console.log("The constants High, medium and Low size as well as High, M and Low LF has been added to the database:");
        console.log(res);
       
        this.theInput.controls['desiredQ'].reset();
        let temp=JSON.parse(res);
        this._results.size_low_sep=temp.KQ_1;
        this._results.size_mid_sep=temp.KQ;
        this._results.size_high_sep=temp.KQ_2;


        this._results.LF_low_sep=temp.LF_1;
        this._results.LF_mid_sep=temp.LF;
        this._results.LF_high_sep=temp.LF_2; 
        //As button is clicked and parameters saved to the service, draw the chart
        this.updateChart()
      },
      err => {
      
        this._snackBar.open("Unfortunately, an error occured when communicating with the calculation tool.", "Ok"); 
        console.log("An error occurred in find-capacity.component.ts, create_graph()");
      }
    );
      

 
  }
  
  

}
