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
  Flowrate: number;
  spintime: string;
  given_flowrates=[1,2,3,4];
  
  

  data;
  theInput: FormGroup;
  show_results: Boolean=true//Change for debugging
  //Chart properties are saved as class properties so that they can be more easily passed to the chart element in the
  //html file. They are given fake initial values before they are updated by the "submit"-button

  chosen_size_unit="KQ"; //The user can choose to use KQ or use Ae for their plot
  chosen_flowrate_unit="m3/h";
  conversion_factor=1;//To convert chosen display unit into m3/h which the backend expects
  

  changeFlowrateUnitChoice(unit){
    if (unit=="L/h"){
      this.conversion_factor=0.001;
      this.chosen_flowrate_unit="L/h"
    }
    else if (unit=="m3/h") {
      this.conversion_factor=1;
      this.chosen_flowrate_unit="m3/h"
    }
    else if (unit=="barrels/h") {
      //1 barrel is 118 L
      this.conversion_factor=118*0.001;
      this.chosen_flowrate_unit="barrels/h";
    }
    else if (unit=="gpm") {
      //Gallons per minute, 1 gallon = 3.78541178 liter
      this.conversion_factor=3.78541178*60*0.001;
      this.chosen_flowrate_unit="gpm"
    }
    else if (unit=="hL/h") {
      this.conversion_factor=0.1;
      this.chosen_flowrate_unit="hL/h"
    }
    else{
      this.conversion_factor=1;
      this.chosen_flowrate_unit="m3/h"

    }



}

  changeSizeUnitChoice(unitChoice: string){
    if (unitChoice=="KQ"){
      console.log("KQ chosen");
      this.chosen_size_unit=unitChoice;

    }
    if (unitChoice=="Ae"){
      console.log("Ae chosen");

      this.chosen_size_unit=unitChoice;

    }
    
  }

  changeTimeFormat(seconds: number){
    var date = new Date(null);
    date.setSeconds(seconds); // specify value for SECONDS here
    var result = date.toISOString().substr(11, 8);
    return result;
  }


  constructor(
    public _results: ResultsService,
    private _PassToPythonServiceHolder: PassToPythonService,
    private formBuilder: FormBuilder,


    ) {  }

  
  
  updateTable(){
    //The updating of the chart is done in a function since we want it to update on the click of the submit  button
    //in case you want to try different parameter one after another
    
    console.log("This is the tabulated flowrate before")
    console.log(this.tableData[0].Flowrate);
    console.log(this.tableData[1].Flowrate);
    console.log(this.tableData[2].Flowrate);
    console.log(this.tableData[3].Flowrate);
    
    this.tableData[0].Flowrate=this.given_flowrates[0];
    this.tableData[1].Flowrate=this.given_flowrates[1];
    this.tableData[2].Flowrate=this.given_flowrates[2];
    this.tableData[3].Flowrate=this.given_flowrates[3];
    
    console.log("This is the tabulated flowrate after")
    console.log(this.tableData[0].Flowrate);
    console.log(this.tableData[1].Flowrate);
    console.log(this.tableData[2].Flowrate);
    console.log(this.tableData[3].Flowrate);

   

    this.tableData[0]['spintime']=this.changeTimeFormat(this._results.recommended_spintimes[0]);
    this.tableData[1]['spintime']=this.changeTimeFormat(this._results.recommended_spintimes[1]);
    this.tableData[2]['spintime']=this.changeTimeFormat(this._results.recommended_spintimes[2]);
    this.tableData[3]['spintime']=this.changeTimeFormat(this._results.recommended_spintimes[3]);

  }
//Default table data
  tableData=[
    {Flowrate: 1, spintime: "10"},
    {Flowrate: 2, spintime: "20"},
    {Flowrate: 3, spintime: "30"},
    {Flowrate: 4, spintime: "40"},
  ];
  displayedColumns: string[] = ['Flowrate','spintime'];
  
    
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

    //Backend expects a KQ, not an Ae. It is simply converted by the factor 38.2 before being passed to the backend.
    if(this.chosen_size_unit=="Ae"){
      this.theInput.controls["KQ"].setValue(this.theInput.value["KQ"]/38.2);
    }


    //Saving the entered data to be tabulated
    let diff=this.theInput.controls['Qmax'].value-this.theInput.controls['Qmin'].value;
    this.given_flowrates[0]=this.theInput.controls['Qmin'].value;
    this.given_flowrates[1]=Math.round(((this.theInput.controls['Qmin'].value+(diff/3))+Number.EPSILON)*100)/100;
    this.given_flowrates[2]=Math.round(((this.theInput.controls['Qmin'].value+(2*diff/3))+Number.EPSILON)*100)/100;
    this.given_flowrates[3]=this.theInput.controls['Qmax'].value;
    console.log("These are the flowrates saved in given_flowrates:");
    console.log(this.given_flowrates);
    //If a different flowrate was chosen, the value must be converted to the unit expected  by the backend [m3/h]

    let Qmin_m3perh=this.theInput.controls['Qmin'].value*this.conversion_factor;
    this.theInput.controls['Qmin'].setValue(Qmin_m3perh)

    
    let Qmax_m3perh=this.theInput.controls['Qmax'].value*this.conversion_factor;
    this.theInput.controls['Qmax'].setValue(Qmax_m3perh)

    this.show_results=true;
    let data=JSON.stringify(this.theInput.value);
    console.log("The data passed to backend:")
    console.log(data);


    this._PassToPythonServiceHolder.sendForSpintimes(data).subscribe(
      res => {
        this.theInput.controls['Qmin'].setValue(this.theInput.controls['Qmin'].value*(1/this.conversion_factor));
        this.theInput.controls['Qmax'].setValue(this.theInput.controls['Qmax'].value*(1/this.conversion_factor));

        console.log("The constant 'recommended spintimes' has been added to the database:")
        console.log(res)
        let temp=JSON.parse(res)
        this._results.recommended_spintimes=temp.Recommended_spintimes//The 4 resulting spintimes in minutes in decimal form 


        console.log("The recommended spintimes:");
        console.log(temp.Recommended_spintimes);


        this.updateTable();
        

        
        
      },
      err => {
        alert("Unfortunately, an error occured when communicating with the calculation tool."); 
        console.log("An error occurred in find-spintimes.component.ts, getSpinTimes()");
      }

    )};
}
