import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PassToPythonService } from '../pass-to-python.service';
import {MatTableModule} from '@angular/material/table';
import {ResultsService} from '../common/services/results.service';
@Component({
  selector: 'app-find-q',
  templateUrl: './find-q.component.html',
  styleUrls: ['./find-q.component.css']
})
export class FindQComponent implements OnInit {
  data;
  your_KQ: FormGroup;


  constructor( 
    private _results: ResultsService,
    private _PassToPythonServiceHolder: PassToPythonService,
    private formBuilder: FormBuilder,


    ) {  }


  ngOnInit() {


    //Yes i know I don't really need a whole group here, but frankly, I have done groups before but not single
    //form controls and I don't have the extra half an hour to deal with the research and debugging. And this works fine.
    this.your_KQ=this.formBuilder.group({
      KQ:[null,[Validators.required,]]})
  }



  submit_your_KQ(){
    /*Sends the desired Q along to the backend and decides what to do with the response*/
    
    let data=JSON.stringify(this.your_KQ.value);

    this._PassToPythonServiceHolder.sendYourKQ(data).subscribe(
      res => {
        this._results.result_container1=res
        console.log("This is the response from backend we get:")
        console.log(res)
        console.log("This is its type:")
        console.log(typeof(res))
        console.log("And after running JSON.parse(res):")
        console.log(JSON.parse(res))
        console.log("The parsed version is of type:")
        console.log(typeof(JSON.parse(res)))
        console.log("Attempting to extract the first value by accessing it as JSON.parse(res)['The Flows']:")
        let temp=JSON.parse(res)
        console.log(temp["The Flows"])
        let temp2=temp["The Flows"][0]
        console.log("The first value in the array only:")
        console.log(temp2)
      /*
      when above code was run this is what we got out of it:
      This is the response from backend we get:
      find-q.component.ts:45 {"The Flows": [5.14, 2.57, 1.27, 0.63]}
      find-q.component.ts:46 This is its type:
      find-q.component.ts:47 string
      find-q.component.ts:48 And after running JSON.parse(res):
      find-q.component.ts:49 {The Flows: Array(4)}
      find-q.component.ts:50 The parsed version is of type:
      find-q.component.ts:51 object
      find-q.component.ts:52 Attempting to extract the first value by accessing it as temp=JSON.parse(res)['The Flows']:
      find-q.component.ts:54 (4) [5.14, 2.57, 1.27, 0.63]
      find-q.component.ts:56 The first value in the array only:
      find-q.component.ts:57 5.14

      */

      
      },
      err=> console.log(err)

    )};
}
