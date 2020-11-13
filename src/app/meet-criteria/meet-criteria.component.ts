import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PassToPythonService } from '../common/services/pass-to-python.service';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {ResultsService} from '../common/services/results.service';

@Component({
  selector: 'app-meet-criteria',
  templateUrl: './meet-criteria.component.html',
  styleUrls: ['./meet-criteria.component.css']
})
export class MeetCriteriaComponent implements OnInit {


  data;
  the_input: FormGroup;


  constructor(
    private _results: ResultsService,
    private _PassToPythonServiceHolder: PassToPythonService,
    private formBuilder: FormBuilder,


    ) {  }


  ngOnInit() {


    //Yes i know I don't really need a whole group here, but frankly, I have done groups before but not single
    //form controls and I don't have the extra half an hour to deal with the research and debugging. And this works fine.
    this.the_input=this.formBuilder.group({

      criteria:[null,[Validators.required,]],
      KQ:[null]})
  }



  submit_your_data(){
    /*Sends the input along to the backend and decides what to do with the response*/
    
    let data=JSON.stringify(this.the_input.value);
    //console.log(data)

    this._PassToPythonServiceHolder.sendYourCriteria(data).subscribe(
      res => {
        console.log("The constants 'LF', 'KQ' and 'Qmax' has been added to the database:")
        let temp=JSON.parse(res)
        console.log(temp)
        this._results.LF=temp.LF//Specify what LF units are!
        this._results.KQ_array=temp.KQ
        this._results.Qmax_array=temp.Qmax
      },
      err => console.log(err)

    )};
}
