import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PassToPythonService } from '../common/services/pass-to-python.service';
import {MatTableModule} from '@angular/material/table';
import {ResultsService} from '../common/services/results.service';
import {ChartDataSets,ChartOptions} from 'chart.js';
import {Color,Label} from 'ng2-charts';
import { formatNumber} from '@angular/common';


@Component({
  selector: 'app-find-spintimes',
  templateUrl: './find-spintimes.component.html',
  styleUrls: ['./find-spintimes.component.css']
})
export class FindSpintimesComponent implements OnInit {
  yourFlows;

  data;
  theInput: FormGroup;
  show_results: Boolean=true//Change for debugging
  //Chart properties are saved as class properties so that they can be more easily passed to the chart element in the
  //html file. They are given fake initial values before they are updated by the "submit"-button
  
  //Initial values so I know if something didn't update
  ChartData: ChartDataSets[]= [
    {data: [1,2,3,4]},
    ];
    
DataLabels=['First','Second','Third','Fourth'];

ChartFontSize=16;
//ChartLegend = true;
ChartType = 'bar';


barChartOptions: ChartOptions={
  title:{
    text:"Times to spin your samples to corr. to your flows",
    display: true,
    fontSize: 30,
  },
  responsive: true, 
  tooltips: {
    enabled:true},
  legend:{
    display:false,
  },  
  plugins:{
    crosshair:false,
  },
  scales:{
    yAxes:[{
        ticks: {
          beginAtZero: true,
          max:6,
         
        },
      scaleLabel: {
        display: true, 
        labelString:'Time to spin sample for [min]',
        fontSize:20,
      },    

    }],
    xAxes:[{
      scaleLabel: {
        display: true, 
        labelString:'Corresponding flow through separator [L/h]',
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

  constructor(
    private _results: ResultsService,
    private _PassToPythonServiceHolder: PassToPythonService,
    private formBuilder: FormBuilder,


    ) {  }

  
  
  updateChart(){
    //The updating of the chart is done in a function since we want it to update on the click of the submit  button
    //in case you want to try different parameter one after another
    let spintimes=this._results.recommended_spintimes;
    let temp=this.yourFlows[1];
    let tempStr=`${temp}`;
    console.log('This is a number in string format:'+tempStr)



  }
    
  ngOnInit() {


    //Yes i know I don't really need a whole group here, but frankly, I have done groups before but not single
    //form controls and I don't have the extra half an hour to deal with the research and debugging. And this works fine.
    this.theInput=this.formBuilder.group({
      KQ:[null,[Validators.required,]],
      Qmin:[null,[Validators.required,]],
      Qmax:[null,[Validators.required,]],
      rpm:[null,[Validators.required,]]})
  }



  getSpinTimes(){
    /*Sends the desired Q along to the backend and decides what to do with the response*/
    this.show_results=true;
    let data=JSON.stringify(this.theInput.value);


    this._PassToPythonServiceHolder.sendForSpintimes(data).subscribe(
      res => {
        console.log("The constant 'recommended spintimes' has been added to the database:")
        console.log(res)
        let temp=JSON.parse(res)
        this._results.recommended_spintimes=temp.Recommended_spintimes//The 4 resulting spintimes in minutes in decimal form 
        this.yourFlows=temp.Flows
        this.updateChart();
        
      },
      err => console.log(err)

    )};
}
