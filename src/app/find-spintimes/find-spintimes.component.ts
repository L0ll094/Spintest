import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PassToPythonService } from '../common/services/pass-to-python.service';
import {MatTableModule} from '@angular/material/table';
import {ResultsService} from '../common/services/results.service';

@Component({
  selector: 'app-find-spintimes',
  templateUrl: './find-spintimes.component.html',
  styleUrls: ['./find-spintimes.component.css']
})
export class FindSpintimesComponent implements OnInit {

  data;
  theInput: FormGroup;


  constructor(
    private _results: ResultsService,
    private _PassToPythonServiceHolder: PassToPythonService,
    private formBuilder: FormBuilder,


    ) {  }


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
    
    let data=JSON.stringify(this.theInput.value);
    //console.log(data)

    this._PassToPythonServiceHolder.sendForSpintimes(data).subscribe(
      res => {
        console.log("The constant 'recommended spintimes' has been added to the database:")
        console.log(res)
        let temp=JSON.parse(res)
        this._results.recommended_spintimes=temp.Recommended_spintimes//The 4 resulting spintimes 
        
      },
      err => console.log(err)

    )};
}
