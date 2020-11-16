import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PassToPythonService } from '../common/services/pass-to-python.service';
import {MatTableModule} from '@angular/material/table';
import {ResultsService} from '../common/services/results.service';

@Component({
  selector: 'app-find-capacity',
  templateUrl: './find-capacity.component.html',
  styleUrls: ['./find-capacity.component.css']
})
export class FindCapacityComponent implements OnInit {
  /*Do I use the FOrmgroup vs just setting it  */
  data;
  theInput: FormGroup;
  show_results=false;


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



  create_graph(){
    /*Sends the desired Q along to the backend and decides what to do with the response*/
    
    let data=JSON.stringify(this.theInput.value);
    console.log(data)

    this._PassToPythonServiceHolder.sendYourQ(data).subscribe(
      res => {
        console.log("The constant 'recommended spintimes' has been added to the database:")
        console.log(res)
        let temp=JSON.parse(res)
        this._results.capacity_low_sep=temp.KQ_1;
        this._results.capacity_mid_sep=temp.KQ;
        this._results.capacity_high_sep=temp.KQ_2;

        this._results.LF_low_sep=temp.LF_1;
        this._results.LF_mid_sep=temp.LF;
        this._results.LF_high_sep=temp.LF_2; 
      },
      err => console.log(err)
    );

  //Plot:
    this.show_results=true;
  }

}
