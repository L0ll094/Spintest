import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PassToPythonService } from '../pass-to-python.service';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-meet-criteria',
  templateUrl: './meet-criteria.component.html',
  styleUrls: ['./meet-criteria.component.css']
})
export class MeetCriteriaComponent implements OnInit {


  data;
  the_input: FormGroup;


  constructor(
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
      res => console.log(res),
      err => console.log(err)

    )};
}
