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


  //Chart properties are saved as class properties so that they can be more easily passed to the chart element in the
  //html file.
  //Fake initial values
  ChartData: ChartDataSets[]= [
    {data: [1,2,3], label: 'Initial_Data50' },
   ];
  ChartFontSize=16;
  ChartLegend = true;
  ChartType = 'line';
  ChartLabels: Label[]= ["First","Second","Third"];
  ChartPlugins=[crosshair];
  ChartOptions={
    title:{
      text:"Capacity needed for different efficiencies",
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
      yAxes:[{
        scaleLabel: {
          display: true, 
          labelString:'Capacity',
          fontSize:20,
        }   ,    
        gridlines: {
          display:true,
        }
      }],
      xAxes:[{
        type:'linear',
        scaleLabel: {
          display: true, 
          labelString:'Separation Efficiency',
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
    let y1=this._results.capacity_low_sep;
    let y2=this._results.capacity_mid_sep;
    let y3=this._results.capacity_high_sep;

    let x1=this.theInput.value['Effluent_conc_low'];
    let x3=this.theInput.value['Effluent_conc_high'];
    let x2=(x1+x3)/2;

    this.ChartData = [
      {data: [
        {x:x1,y:y1},
        {x:x2,y:y2},
        {x:x3,y:y3}
      ],
        label: 'Suggested capacity',
        pointRadius:10,
        pointHoverRadius:15,
        fill: false,
      },
     ];

    //let Label1=this.theInput.value['Effluent_conc_low'];
    //let Label2=this.theInput.value['Effluent_conc_high'];
    //let Label_mid=(Label1+Label2)/2;
    //this.ChartLabels=[`${Label1}%`,`${Label_mid}%`,`${Label2}%`];
    //this.ChartLabels=[`${Label1}%`,`${Label_mid}%`,`${Label2}%`];


  }



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
//HOw to acces the value inputed in other parts of this script: i.e. this.theInput.value['desiredQ'])


  create_graph(){
    /*Sends the desired Q along to the backend and decides what to do with the response*/
     //Plot:
    this.show_results=true;
    let data=JSON.stringify(this.theInput.value);
    console.log("This is 'Data'");
    console.log(data);
    console.log("This is the first value of Data:");
    console.log(this.theInput.value['desiredQ'])

    this._PassToPythonServiceHolder.sendYourQ(data).subscribe(
      res => {

        console.log("The constants High, medium and Low capacity as well as High, M and Low LF has been added to the database:");
        console.log(res);
       

        let temp=JSON.parse(res);
        this._results.capacity_low_sep=temp.KQ_1;
        this._results.capacity_mid_sep=temp.KQ;
        this._results.capacity_high_sep=temp.KQ_2;


        this._results.LF_low_sep=temp.LF_1;
        this._results.LF_mid_sep=temp.LF;
        this._results.LF_high_sep=temp.LF_2; 
        //As button is clicked and parameters saved to the service, draw the chart
        this.updateChart()
      },
      err => console.log(err)
    );
      

 
  }
  
  

}
