import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PassToPythonService } from '../common/services/pass-to-python.service';
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
        console.log("The constant 'resulting flows' has been added to the database:")
        console.log(res)
        let temp=JSON.parse(res)
        this._results.resulting_flows=temp.The_Flows//The 4 resulting flows as a vector
      },
      err=> console.log(err)

    )};
}
