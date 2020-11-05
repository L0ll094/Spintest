import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PassToPythonService } from '../pass-to-python.service';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-find-kqor-ae',
  templateUrl: './find-kqor-ae.component.html',
  styleUrls: ['./find-kqor-ae.component.css']
})
export class FindKQorAeComponent implements OnInit {
  data;
  your_Q: FormGroup;


  constructor(
    private _PassToPythonServiceHolder: PassToPythonService,
    private formBuilder: FormBuilder,


    ) {  }


  ngOnInit() {


    //Yes i know I don't really need a whole group here, but frankly, I have done groups before but not single
    //form controls and I don't have the extra half an hour to deal with the research and debugging. And this works fine.
    this.your_Q=this.formBuilder.group({
      desiredQ:[null,[Validators.required,]]})
  }



  submit_your_Q(){
    /*Sends the desired Q along to the backend and decides what to do with the response*/
    
    let data=JSON.stringify(this.your_Q.value);
    //console.log(data)

    this._PassToPythonServiceHolder.sendYourQ(data).subscribe(
      res => console.log(res),
      err => console.log(err)

    )};
}
